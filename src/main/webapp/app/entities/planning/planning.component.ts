import {
    Component,
    ChangeDetectionStrategy,
    ViewChild,
    TemplateRef, ViewEncapsulation, OnInit, ElementRef
} from '@angular/core';
import {
    startOfDay,
    endOfDay,
    subDays,
    addDays,
    endOfMonth,
    isSameDay,
    isSameMonth,
    addHours
} from 'date-fns';
import {Subject, Subscription} from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as jsPDF from 'jspdf';
import {
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent,
    CalendarView
} from 'angular-calendar';

import {colors} from 'app/entities/demo-modules/colors';
import {Cursus, ICursus} from'app/shared/model/cursus.model';
import {CursusService} from 'app/entities/cursus';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';
import {Principal} from 'app/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Formateur, IFormateur} from 'app/shared/model/formateur.model';
import {FormateurService} from 'app/entities/formateur';


@Component({
    selector: 'jhi-planning',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './planning.component.html',
    styleUrls: ['angular-calendar.css'], encapsulation: ViewEncapsulation.None
})
export class PlanningComponent implements OnInit {
    @ViewChild('modalContent')
    modalContent: TemplateRef<any>;

    @ViewChild('content') content: ElementRef;



    view: CalendarView = CalendarView.Month;
    currentAccount: any;
    formateurs: IFormateur[];
    cursuses: ICursus[];
    eventSubscriber: Subscription;

    CalendarView = CalendarView;

    viewDate: Date = new Date();

    modalData: {
        action: string;
        event: CalendarEvent;
    };

    actions: CalendarEventAction[] = [
        {
            label: '<i class="fa fa-fw fa-pencil"></i>',
            onClick: ({ event }: { event: CalendarEvent }): void => {
                this.handleEvent('Edited', event);
            }
        },
        {
            label: '<i class="fa fa-fw fa-times"></i>',
            onClick: ({ event }: { event: CalendarEvent }): void => {
                this.events = this.events.filter(iEvent => iEvent !== event);
                this.handleEvent('Deleted', event);
            }
        }
    ];

    refresh: Subject<any> = new Subject();

    events: CalendarEvent[] = [];

    activeDayIsOpen: boolean = true;

    constructor(private modal: NgbModal,
                private formateurService: FormateurService,
                private cursusService: CursusService,
                private jhiAlertService: JhiAlertService,
                private eventManager: JhiEventManager,
                private principal: Principal) {}

    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
        if (isSameMonth(date, this.viewDate)) {
            this.viewDate = date;
            if (
                (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0
            ) {
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
            }
        }
    }

    eventTimesChanged({
                          event,
                          newStart,
                          newEnd
                      }: CalendarEventTimesChangedEvent): void {
        event.start = newStart;
        event.end = newEnd;
        this.handleEvent('Dropped or resized', event);
        this.refresh.next();
    }

    handleEvent(action: string, event: CalendarEvent): void {
        this.modalData = { event, action };
        this.modal.open(this.modalContent, { size: 'lg' });
    }


    pushCursusPlanning(cursuses: Cursus[]){
        this.events= [];
        for(let cursus of cursuses){
            this.events.push({
                title: cursus.nom,
                start: startOfDay(new Date(cursus.dateDebut.toDate())),
                end: endOfDay(new Date(cursus.dateFin.toString())),
                color: colors.red,
                draggable: true,
                resizable: {
                    beforeStart: true,
                    afterEnd: true
                }
            });
            this.refresh.next();
        }
    }




    pushFormateurPlanning(formateurs: Formateur[]){
        this.events= [];
        for(let formateur of formateurs){
            this.events.push({
                title: formateur.nom,
                start: startOfDay(new Date(module.dateDebut.toDate())),
                end: endOfDay(new Date(module.dateFin.toString())),
                color: colors.blue,
                draggable: true,
                resizable: {
                    beforeStart: true,
                    afterEnd: true
                }
            });
            this.refresh.next();
        }}


    addEvent(): void {
        this.events.push({
            title: 'New event',
            start: startOfDay(new Date()),
            end: endOfDay(new Date()),
            color: colors.red,
            draggable: true,
            resizable: {
                beforeStart: true,
                afterEnd: true
            }
        });
        this.refresh.next();
    }
    loadAll() {
        this.cursusService.query().subscribe(
            (res: HttpResponse<ICursus[]>) => {
                this.cursuses = res.body;

            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.formateurService.query().subscribe(
            (res: HttpResponse<IFormateur[]>) => {
                this.formateurs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }



    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCursuses();
        this.registerChangeInFormateurs();
    }

    trackIdF(index: number, item: IFormateur) {
        return item.id;
    }

    registerChangeInFormateurs() {
        this.eventSubscriber = this.eventManager.subscribe('formateurListModification', response => this.loadAll());
    }
    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICursus) {
        return item.id;
    }

    registerChangeInCursuses() {
        this.eventSubscriber = this.eventManager.subscribe('cursusListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    public downloadPDF(){
        let doc = new jsPDF();
        let specialElementHandlers = {
            '#editor': function(element, renderer) {
            return true;
        }
        };
        let content = this.content.nativeElement;
        doc.fromHTML(content.innerHTML, 15,15, {
           'width': 190,
                'elementHandlers': specialElementHandlers
        });

        doc.save('planning.pdf');
    }
}



