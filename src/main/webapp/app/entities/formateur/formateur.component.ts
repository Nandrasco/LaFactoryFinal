import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {Observable, Subject, Subscription} from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import {Formateur, IFormateur} from 'app/shared/model/formateur.model';
import { Principal } from 'app/core';
import { FormateurService } from './formateur.service';
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";

@Component({
    selector: 'jhi-formateur',
    templateUrl: './formateur.component.html'
})
export class FormateurComponent implements OnInit, OnDestroy {
    formateurs: IFormateur[];
    currentAccount: any;
    eventSubscriber: Subscription;
    private searchTerms = new Subject<string>();
    private searchDebounce = 300;
    searchTerm: String;
    constructor(
        private formateurService: FormateurService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }
    loadAll() {

        this.formateurService.query().subscribe(
            (res: HttpResponse<IFormateur[]>) => {
                this.formateurs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInFormateurs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }


    trackId(index: number, item: IFormateur) {
        return item.id;
    }

    registerChangeInFormateurs() {
        this.eventSubscriber = this.eventManager.subscribe('formateurListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    search(term: string): void {
        this.searchTerms.next(term);
    }
}
