import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IStagiaire } from 'app/shared/model/stagiaire.model';
import { StagiaireService } from './stagiaire.service';
import index from '@angular/cli/lib/cli';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'jhi-stagiaire',
    templateUrl: './stagiaire.component.html'
})
export class StagiairesSalleComponent implements OnInit, OnDestroy {
    stagiaires: IStagiaire[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private activatedRoute: ActivatedRoute,
        private route: Router,
        private stagiaireService: StagiaireService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.activatedRoute.params.subscribe(param => {
            this.stagiaireService.findBySalleId(param.id).subscribe(res => {
                this.stagiaires = res.body;
            });
        });
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IStagiaire) {
        return item.id;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
