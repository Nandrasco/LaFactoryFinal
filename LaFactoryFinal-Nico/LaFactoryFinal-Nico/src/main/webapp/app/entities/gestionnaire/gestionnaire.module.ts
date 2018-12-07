import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LaFactoryFinalSharedModule } from 'app/shared';
import {
    GestionnaireComponent,
    GestionnaireDetailComponent,
    GestionnaireUpdateComponent,
    GestionnaireDeletePopupComponent,
    GestionnaireDeleteDialogComponent,
    gestionnaireRoute,
    gestionnairePopupRoute
} from './';

const ENTITY_STATES = [...gestionnaireRoute, ...gestionnairePopupRoute];

@NgModule({
    imports: [LaFactoryFinalSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        GestionnaireComponent,
        GestionnaireDetailComponent,
        GestionnaireUpdateComponent,
        GestionnaireDeleteDialogComponent,
        GestionnaireDeletePopupComponent
    ],
    entryComponents: [
        GestionnaireComponent,
        GestionnaireUpdateComponent,
        GestionnaireDeleteDialogComponent,
        GestionnaireDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LaFactoryFinalGestionnaireModule {}
