import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IOrdinateur } from 'app/shared/model/ordinateur.model';
import { OrdinateurService } from './ordinateur.service';
import { IStagiaire } from 'app/shared/model/stagiaire.model';
import { StagiaireService } from 'app/entities/stagiaire';

@Component({
    selector: 'jhi-ordinateur-update',
    templateUrl: './ordinateur-update.component.html'
})
export class OrdinateurUpdateComponent implements OnInit {
    ordinateur: IOrdinateur;
    isSaving: boolean;

    stagiaires: IStagiaire[];
    dateAchatDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private ordinateurService: OrdinateurService,
        private stagiaireService: StagiaireService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ ordinateur }) => {
            this.ordinateur = ordinateur;
        });
        this.stagiaireService.query({ filter: 'ordinateur-is-null' }).subscribe(
            (res: HttpResponse<IStagiaire[]>) => {
                if (!this.ordinateur.stagiaire || !this.ordinateur.stagiaire.id) {
                    this.stagiaires = res.body;
                } else {
                    this.stagiaireService.find(this.ordinateur.stagiaire.id).subscribe(
                        (subRes: HttpResponse<IStagiaire>) => {
                            this.stagiaires = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.ordinateur.id !== undefined) {
            this.subscribeToSaveResponse(this.ordinateurService.update(this.ordinateur));
        } else {
            this.subscribeToSaveResponse(this.ordinateurService.create(this.ordinateur));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IOrdinateur>>) {
        result.subscribe((res: HttpResponse<IOrdinateur>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackStagiaireById(index: number, item: IStagiaire) {
        return item.id;
    }
}
