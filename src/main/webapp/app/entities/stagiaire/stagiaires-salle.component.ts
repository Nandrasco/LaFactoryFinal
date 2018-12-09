import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IStagiaire } from 'app/shared/model/stagiaire.model';
import { StagiaireService } from './stagiaire.service';
import index from '@angular/cli/lib/cli';
import { ActivatedRoute, Router } from '@angular/router';
import { ISalle } from 'app/shared/model/salle.model';
import { ICursus } from 'app/shared/model/cursus.model';
import { IProjecteur } from 'app/shared/model/projecteur.model';
import { SalleService } from 'app/entities/salle';

@Component({
    selector: 'jhi-stagiaire',
    templateUrl: './stagiaires-salle.component.html'
})
export class StagiairesSalleComponent implements OnInit {
    stagiaires: IStagiaire[];
    currentAccount: any;
    eventSubscriber: Subscription;
    salle: ISalle;
    col: String;

    constructor(
        private activatedRoute: ActivatedRoute,
        private route: Router,
        private stagiaireService: StagiaireService,
        private salleService: SalleService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.activatedRoute.params.subscribe(param => {
            this.salleService.find(param.id).subscribe(salle => {
                this.salle = salle.body;
            });
        });
        this.activatedRoute.params.subscribe(param => {
            this.stagiaireService.findBySalleId(param.id).subscribe(res => {
                this.stagiaires = res.body;
            });
            /*            this.salleService.find(param.id).subscribe(salle => {
                            this.salle = salle.body;
                        });*/
        });
    }

    trackId(index: number, item: IStagiaire) {
        return item.id;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    private display() {
        if (this.stagiaires.length >= this.salle.capaciteMax) {
            this.col = 'red';
        } else {
            this.col = '#0099ff';
        }
        return this.col;
    }
}
