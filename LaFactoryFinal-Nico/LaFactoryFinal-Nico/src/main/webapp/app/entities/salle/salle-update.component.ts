import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ISalle } from 'app/shared/model/salle.model';
import { SalleService } from './salle.service';
import { IProjecteur } from 'app/shared/model/projecteur.model';
import { ProjecteurService } from 'app/entities/projecteur';
import { ICursus } from 'app/shared/model/cursus.model';
import { CursusService } from 'app/entities/cursus';

@Component({
    selector: 'jhi-salle-update',
    templateUrl: './salle-update.component.html'
})
export class SalleUpdateComponent implements OnInit {
    salle: ISalle;
    isSaving: boolean;

    projecteurs: IProjecteur[];

    cursuses: ICursus[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private salleService: SalleService,
        private projecteurService: ProjecteurService,
        private cursusService: CursusService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ salle }) => {
            this.salle = salle;
        });
        this.projecteurService.query().subscribe(
            (res: HttpResponse<IProjecteur[]>) => {
                this.projecteurs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.cursusService.query().subscribe(
            (res: HttpResponse<ICursus[]>) => {
                this.cursuses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.salle.id !== undefined) {
            this.subscribeToSaveResponse(this.salleService.update(this.salle));
        } else {
            this.subscribeToSaveResponse(this.salleService.create(this.salle));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISalle>>) {
        result.subscribe((res: HttpResponse<ISalle>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackProjecteurById(index: number, item: IProjecteur) {
        return item.id;
    }

    trackCursusById(index: number, item: ICursus) {
        return item.id;
    }
}
