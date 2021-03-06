import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LaFactoryFinalSharedModule } from 'app/shared';
import {
    FormateurComponent,
    FormateurDetailComponent,
    FormateurUpdateComponent,
    FormateurDeletePopupComponent,
    FormateurDeleteDialogComponent,
    formateurRoute,
    formateurPopupRoute
} from './';
import {KeysPipe} from "app/entities/formateur/keys.pipe";

const ENTITY_STATES = [...formateurRoute, ...formateurPopupRoute];

@NgModule({
    imports: [LaFactoryFinalSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FormateurComponent,
        FormateurDetailComponent,
        FormateurUpdateComponent,
        FormateurDeleteDialogComponent,
        FormateurDeletePopupComponent,
        KeysPipe
    ],
    entryComponents: [FormateurComponent, FormateurUpdateComponent, FormateurDeleteDialogComponent, FormateurDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LaFactoryFinalFormateurModule {}
