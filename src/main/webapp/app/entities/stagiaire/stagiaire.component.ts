import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IStagiaire } from 'app/shared/model/stagiaire.model';
import { Principal } from 'app/core';
import { StagiaireService } from './stagiaire.service';
import index from '@angular/cli/lib/cli';

@Component({
    selector: 'jhi-stagiaire',
    templateUrl: './stagiaire.component.html'
})
export class StagiaireComponent implements OnInit, OnDestroy {
    stagiaires: IStagiaire[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private stagiaireService: StagiaireService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.stagiaireService.query().subscribe(
            (res: HttpResponse<IStagiaire[]>) => {
                this.stagiaires = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInStagiaires();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IStagiaire) {
        return item.id;
    }

    registerChangeInStagiaires() {
        this.eventSubscriber = this.eventManager.subscribe('stagiaireListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
