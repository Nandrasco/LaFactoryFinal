import {planningRoute} from "app/entities/planning/planning.route";
import {RouterModule} from "@angular/router";
import {LaFactoryFinalSharedModule} from "app/shared";
import {PlanningComponent} from "app/entities/planning/planning.component";
import {NgModule} from "@angular/core";
import {CalendarCommonModule} from 'angular-calendar';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DemoUtilsModule} from "app/entities/demo-modules/module";
import {FormsModule} from "@angular/forms";
import {NgbModalModule} from "@ng-bootstrap/ng-bootstrap";
import {FlatpickrModule} from "angularx-flatpickr";
import { HttpClientModule } from '@angular/common/http';

const ENTITY_STATES = [...planningRoute];

@NgModule({
    imports: [LaFactoryFinalSharedModule, RouterModule.forChild(ENTITY_STATES), DemoUtilsModule, HttpClientModule,
        BrowserAnimationsModule, CommonModule,
        FormsModule,
        NgbModalModule,
        FlatpickrModule.forRoot(),
        CalendarModule, CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        })],
    declarations: [
        PlanningComponent
    ],
    entryComponents: [PlanningComponent]
})
export class LaFactoryFinalPlanningModule {}
