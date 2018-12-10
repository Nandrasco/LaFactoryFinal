import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { CalendarEvent } from 'angular-calendar';
import { IModule } from 'app/shared/model/module.model';
import { ModuleService } from './module.service';
import { IMatiere } from 'app/shared/model/matiere.model';
import { MatiereService } from 'app/entities/matiere';
import { IFormateur } from 'app/shared/model/formateur.model';
import { FormateurService } from 'app/entities/formateur';
import { ICursus } from 'app/shared/model/cursus.model';
import { CursusService } from 'app/entities/cursus';
import { colors } from 'app/entities/demo-modules/colors';
import { allEvents } from 'app/entities/planning/all-events';
import { PlanningService } from 'app/entities/planning/planning.service';

@Component({
    selector: 'jhi-module-update',
    templateUrl: './module-update.component.html'
})
export class ModuleUpdateComponent implements OnInit {
    module: IModule;
    isSaving: boolean;

    matieres: IMatiere[];

    formateurs: IFormateur[];

    cursuses: ICursus[];
    dateDebutDp: any;
    dateFinDp: any;
    event: CalendarEvent = new class implements CalendarEvent {
        allDay: boolean;
        cssClass: string;
        draggable: boolean;
        end: Date;
        id: string | number;
        resizable: { beforeStart?: boolean; afterEnd?: boolean };
        start: Date;
        title: string;
    }();
    constructor(
        private planningService: PlanningService,
        private jhiAlertService: JhiAlertService,
        private moduleService: ModuleService,
        private matiereService: MatiereService,
        private formateurService: FormateurService,
        private cursusService: CursusService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.event.title = null;
        this.event.start = null;
        this.event.end = null;
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ module }) => {
            this.module = module;
        });
        this.matiereService.query().subscribe(
            (res: HttpResponse<IMatiere[]>) => {
                this.matieres = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.formateurService.query().subscribe(
            (res: HttpResponse<IFormateur[]>) => {
                this.formateurs = res.body;
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
        if (this.module.id !== undefined) {
            this.subscribeToSaveResponse(this.moduleService.update(this.module));
        } else {
            this.subscribeToSaveResponse(this.moduleService.create(this.module));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IModule>>) {
        result.subscribe((res: HttpResponse<IModule>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackFormateurById(index: number, item: IFormateur) {
        return item.id;
    }

    trackCursusById(index: number, item: ICursus) {
        return item.id;
    }

    createEvent() {
        console.log(this.event);
        this.event.color = colors.blue;
        this.event.actions = this.planningService.actions;
        this.event.allDay = true;
        this.event.resizable = {
            beforeStart: true,
            afterEnd: true
        };
        this.event.draggable = true;
        allEvents.push(this.event);
        console.log('AAAAA', allEvents);
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
