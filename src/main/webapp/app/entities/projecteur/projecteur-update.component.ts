import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IProjecteur } from 'app/shared/model/projecteur.model';
import { ProjecteurService } from './projecteur.service';
import { ISalle } from 'app/shared/model/salle.model';
import { SalleService } from 'app/entities/salle';

@Component({
    selector: 'jhi-projecteur-update',
    templateUrl: './projecteur-update.component.html'
})
export class ProjecteurUpdateComponent implements OnInit {
    projecteur: IProjecteur;
    isSaving: boolean;

    salles: ISalle[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private projecteurService: ProjecteurService,
        private salleService: SalleService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ projecteur }) => {
            this.projecteur = projecteur;
        });
        this.salleService.query({ filter: 'projecteur-is-null' }).subscribe(
            (res: HttpResponse<ISalle[]>) => {
                if (!this.projecteur.salle || !this.projecteur.salle.id) {
                    this.salles = res.body;
                } else {
                    this.salleService.find(this.projecteur.salle.id).subscribe(
                        (subRes: HttpResponse<ISalle>) => {
                            this.salles = [subRes.body].concat(res.body);
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
        if (this.projecteur.id !== undefined) {
            this.subscribeToSaveResponse(this.projecteurService.update(this.projecteur));
        } else {
            this.subscribeToSaveResponse(this.projecteurService.create(this.projecteur));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IProjecteur>>) {
        result.subscribe((res: HttpResponse<IProjecteur>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackSalleById(index: number, item: ISalle) {
        return item.id;
    }
}
