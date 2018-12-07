import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LaFactoryFinalSharedModule } from 'app/shared';
import {
    MatiereComponent,
    MatiereDetailComponent,
    MatiereUpdateComponent,
    MatiereDeletePopupComponent,
    MatiereDeleteDialogComponent,
    matiereRoute,
    matierePopupRoute
} from './';
import { MatieresStagiaireComponent } from './matieres-stagiaire.component';

const ENTITY_STATES = [...matiereRoute, ...matierePopupRoute];

@NgModule({
    imports: [LaFactoryFinalSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MatiereComponent,
        MatiereDetailComponent,
        MatiereUpdateComponent,
        MatiereDeleteDialogComponent,
        MatiereDeletePopupComponent,
        MatieresStagiaireComponent
    ],
    entryComponents: [
        MatiereComponent,
        MatiereUpdateComponent,
        MatiereDeleteDialogComponent,
        MatiereDeletePopupComponent,
        MatieresStagiaireComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LaFactoryFinalMatiereModule {}
