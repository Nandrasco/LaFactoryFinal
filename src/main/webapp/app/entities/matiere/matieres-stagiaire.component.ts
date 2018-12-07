import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMatiere } from 'app/shared/model/matiere.model';
import { Principal } from 'app/core';
import { MatiereService } from './matiere.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'jhi-matiere',
    templateUrl: './matiere.component.html'
})
export class MatieresStagiaireComponent implements OnInit, OnDestroy {
    matieres: IMatiere[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private activatedRoute: ActivatedRoute,
        private route: Router,
        private matiereService: MatiereService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    ngOnInit() {
        this.activatedRoute.params.subscribe(param => {
            this.matiereService.findByStagiaireId(param.id).subscribe(res => {
                this.matieres = res.body;
            });
        });
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMatiere) {
        return item.id;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
