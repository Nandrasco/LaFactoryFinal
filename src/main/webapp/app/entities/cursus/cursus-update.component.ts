import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { CalendarEvent } from 'angular-calendar';
import { ICursus } from 'app/shared/model/cursus.model';
import { CursusService } from './cursus.service';
import { IGestionnaire } from 'app/shared/model/gestionnaire.model';
import { GestionnaireService } from 'app/entities/gestionnaire';
import { ISalle } from 'app/shared/model/salle.model';
import { SalleService } from 'app/entities/salle';
import { IStagiaire } from 'app/shared/model/stagiaire.model';
import { StagiaireService } from 'app/entities/stagiaire';
import { IModule } from 'app/shared/model/module.model';
import { ModuleService } from 'app/entities/module';
import { Principal } from 'app/core';
import { allEvents } from 'app/entities/planning/all-events';
import { colors } from 'app/entities/demo-modules/colors';
import { PlanningService } from 'app/entities/planning/planning.service';

@Component({
    selector: 'jhi-cursus-update',
    templateUrl: './cursus-update.component.html'
})
export class CursusUpdateComponent implements OnInit {
    cursus: ICursus;

    overbooked = false;

    isSaving: boolean;

    gestionnaires: IGestionnaire[];

    salles: ISalle[];

    stagiaires: IStagiaire[];

    modules: IModule[];
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
    currentAccount: any;

    currentAccount: any;

    constructor(
        private planningService: PlanningService,
        private jhiAlertService: JhiAlertService,
        private cursusService: CursusService,
        private gestionnaireService: GestionnaireService,
        private salleService: SalleService,
        private stagiaireService: StagiaireService,
        private moduleService: ModuleService,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {}

    ngOnInit() {
        this.event.title = null;
        this.event.start = null;
        this.event.end = null;
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ cursus }) => {
            this.cursus = cursus;
        });
        this.gestionnaireService.query().subscribe(
            (res: HttpResponse<IGestionnaire[]>) => {
                this.gestionnaires = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.salleService.query({ filter: 'cursus-is-null' }).subscribe(
            (res: HttpResponse<ISalle[]>) => {
                if (!this.cursus.salle || !this.cursus.salle.id) {
                    this.salles = res.body;
                } else {
                    this.salleService.find(this.cursus.salle.id).subscribe(
                        (subRes: HttpResponse<ISalle>) => {
                            this.salles = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.stagiaireService.query().subscribe(
            (res: HttpResponse<IStagiaire[]>) => {
                this.stagiaires = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.moduleService.query().subscribe(
            (res: HttpResponse<IModule[]>) => {
                this.modules = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.cursus.id !== undefined) {
            this.subscribeToSaveResponse(this.cursusService.update(this.cursus));
        } else {
            this.subscribeToSaveResponse(this.cursusService.create(this.cursus));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICursus>>) {
        result.subscribe((res: HttpResponse<ICursus>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackGestionnaireById(index: number, item: IGestionnaire) {
        return item.id;
    }

    trackSalleById(index: number, item: ISalle) {
        return item.id;
    }

    trackStagiaireById(index: number, item: IStagiaire) {
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

    private toHide(): boolean {
        if (this.currentAccount.authorities.includes('ROLE_GESTIONNAIRE')) {
            return true;
        } else {
            return false;
        }
    }

    createEvent() {
        console.log(this.event);
        this.event.color = colors.red;
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

    isOverbooked() {
        if (this.cursus.stagiaires.length > this.cursus.salle.capaciteMax) {
            this.overbooked = true;
        } else {
            this.overbooked = false;
        }
    }
}
