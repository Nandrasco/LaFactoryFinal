import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LaFactoryFinalSharedModule } from 'app/shared';
import {
    TechnicienComponent,
    TechnicienDetailComponent,
    TechnicienUpdateComponent,
    TechnicienDeletePopupComponent,
    TechnicienDeleteDialogComponent,
    technicienRoute,
    technicienPopupRoute
} from './';

const ENTITY_STATES = [...technicienRoute, ...technicienPopupRoute];

@NgModule({
    imports: [LaFactoryFinalSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TechnicienComponent,
        TechnicienDetailComponent,
        TechnicienUpdateComponent,
        TechnicienDeleteDialogComponent,
        TechnicienDeletePopupComponent
    ],
    entryComponents: [TechnicienComponent, TechnicienUpdateComponent, TechnicienDeleteDialogComponent, TechnicienDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LaFactoryFinalTechnicienModule {}
