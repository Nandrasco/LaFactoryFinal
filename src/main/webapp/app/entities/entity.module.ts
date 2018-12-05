import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { LaFactoryFinalFormateurModule } from './formateur/formateur.module';
import { LaFactoryFinalStagiaireModule } from './stagiaire/stagiaire.module';
import { LaFactoryFinalTechnicienModule } from './technicien/technicien.module';
import { LaFactoryFinalGestionnaireModule } from './gestionnaire/gestionnaire.module';
import { LaFactoryFinalModuleModule } from './module/module.module';
import { LaFactoryFinalCursusModule } from './cursus/cursus.module';
import { LaFactoryFinalMatiereModule } from './matiere/matiere.module';
import { LaFactoryFinalOrdinateurModule } from './ordinateur/ordinateur.module';
import { LaFactoryFinalProjecteurModule } from './projecteur/projecteur.module';
import { LaFactoryFinalSalleModule } from './salle/salle.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        LaFactoryFinalFormateurModule,
        LaFactoryFinalStagiaireModule,
        LaFactoryFinalTechnicienModule,
        LaFactoryFinalGestionnaireModule,
        LaFactoryFinalModuleModule,
        LaFactoryFinalCursusModule,
        LaFactoryFinalMatiereModule,
        LaFactoryFinalOrdinateurModule,
        LaFactoryFinalProjecteurModule,
        LaFactoryFinalSalleModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LaFactoryFinalEntityModule {}
