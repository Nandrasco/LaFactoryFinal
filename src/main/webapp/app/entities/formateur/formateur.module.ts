import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LaFactoryFinalSharedModule } from 'app/shared';
import {
    FormateurComponent,
    FormateurDetailComponent,
    FormateurUpdateComponent,
    FormateurDeletePopupComponent,
    FormateurDeleteDialogComponent,
    formateurRoute,
    formateurPopupRoute,
    FormateurListeMatiereComponent
} from './';
import {KeysPipe} from "app/entities/formateur/keys.pipe";


const ENTITY_STATES = [...formateurRoute, ...formateurPopupRoute];
@NgModule({
    imports: [LaFactoryFinalSharedModule, BrowserModule, FormsModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FormateurComponent,
        FormateurDetailComponent,
        FormateurUpdateComponent,
        FormateurDeleteDialogComponent,
        FormateurDeletePopupComponent,
        FormateurListeMatiereComponent,
        KeysPipe
    ],
    entryComponents: [
        FormateurComponent,
        FormateurUpdateComponent,
        FormateurDeleteDialogComponent,
        FormateurDeletePopupComponent,
        FormateurListeMatiereComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LaFactoryFinalFormateurModule {}
