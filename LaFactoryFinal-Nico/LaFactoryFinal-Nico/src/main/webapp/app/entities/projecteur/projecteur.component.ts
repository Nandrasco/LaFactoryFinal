import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IProjecteur } from 'app/shared/model/projecteur.model';
import { Principal } from 'app/core';
import { ProjecteurService } from './projecteur.service';

@Component({
    selector: 'jhi-projecteur',
    templateUrl: './projecteur.component.html'
})
export class ProjecteurComponent implements OnInit, OnDestroy {
    projecteurs: IProjecteur[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private projecteurService: ProjecteurService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.projecteurService.query().subscribe(
            (res: HttpResponse<IProjecteur[]>) => {
                this.projecteurs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInProjecteurs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IProjecteur) {
        return item.id;
    }

    registerChangeInProjecteurs() {
        this.eventSubscriber = this.eventManager.subscribe('projecteurListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
