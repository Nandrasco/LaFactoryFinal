import { Component, ChangeDetectionStrategy, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CalendarEvent } from 'angular-calendar';
import { ActivatedRoute, Router } from '@angular/router';
import { isSameMonth, isSameDay, startOfMonth, endOfMonth, startOfWeek, endOfWeek, startOfDay, endOfDay, format } from 'date-fns';
import { Observable } from 'rxjs';
import { colors } from 'app/entities/demo-modules/colors';
import { SERVER_API_URL } from 'app/app.constants';
import { Salle } from 'app/shared/model/salle.model';
import { Cursus, ICursus } from 'app/shared/model/cursus.model';
import { allEvents } from 'app/entities/planning/all-events';

interface Film {
    id: number;
    title: string;
    release_date: string;
}

function getTimezoneOffsetString(date: Date): string {
    const timezoneOffset = date.getTimezoneOffset();
    const hoursOffset = String(Math.floor(Math.abs(timezoneOffset / 60))).padStart(2, '0');
    const minutesOffset = String(Math.abs(timezoneOffset % 60)).padEnd(2, '0');
    const direction = timezoneOffset > 0 ? '-' : '+';
    return `T00:00:00${direction}${hoursOffset}${minutesOffset}`;
}

@Component({
    selector: 'jhi-planning',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './planning.component.html',
    styleUrls: ['angular-calendar.css'],
    encapsulation: ViewEncapsulation.None
})
export class PlanningComponent implements OnInit {
    view = 'month';

    viewDate: Date = new Date();

    events = allEvents;

    activeDayIsOpen = false;

    constructor(private http: HttpClient, private router: Router) {}

    ngOnInit(): void {
        console.log(allEvents);
        this.fetchEvents();
    }

    fetchEvents(): void {
        const getStart: any = {
            month: startOfMonth,
            week: startOfWeek,
            day: startOfDay
        }[this.view];

        const getEnd: any = {
            month: endOfMonth,
            week: endOfWeek,
            day: endOfDay
        }[this.view];

        const params = new HttpParams()
            .set('primary_release_date.gte', format(getStart(this.viewDate), 'YYYY-MM-DD'))
            .set('primary_release_date.lte', format(getEnd(this.viewDate), 'YYYY-MM-DD'));
    }

    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
        if (isSameMonth(date, this.viewDate)) {
            this.viewDate = date;
            if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
            }
        }
    }

    eventClicked(event: CalendarEvent<{ cursus: Cursus }>): void {
        window.open(`cursus/${event.meta.cursus.id}`, '_blank');
    }
}
