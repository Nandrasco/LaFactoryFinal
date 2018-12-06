import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IFormateur } from 'app/shared/model/formateur.model';
import { FormateurService } from './formateur.service';
import { IMatiere } from 'app/shared/model/matiere.model';
import { MatiereService } from 'app/entities/matiere';
import { IModule } from 'app/shared/model/module.model';
import { ModuleService } from 'app/entities/module';

@Component({
    selector: 'jhi-formateur-update',
    templateUrl: './formateur-update.component.html'
})
export class FormateurUpdateComponent implements OnInit {
    formateur: IFormateur;
    isSaving: boolean;

    matieres: IMatiere[];

    modules: IModule[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private formateurService: FormateurService,
        private matiereService: MatiereService,
        private moduleService: ModuleService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ formateur }) => {
            this.formateur = formateur;
        });
        this.matiereService.query().subscribe(
            (res: HttpResponse<IMatiere[]>) => {
                this.matieres = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.moduleService.query().subscribe(
            (res: HttpResponse<IModule[]>) => {
                this.modules = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.formateur.id !== undefined) {
            this.subscribeToSaveResponse(this.formateurService.update(this.formateur));
        } else {
            this.subscribeToSaveResponse(this.formateurService.create(this.formateur));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IFormateur>>) {
        result.subscribe((res: HttpResponse<IFormateur>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackMatiereById(index: number, item: IMatiere) {
        return item.id;
    }

    trackModuleById(index: number, item: IModule) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
