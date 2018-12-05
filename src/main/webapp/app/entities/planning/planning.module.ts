import {planningRoute} from "app/entities/planning/planning.route";
import {RouterModule} from "@angular/router";
import {LaFactoryFinalSharedModule} from "app/shared";
import {PlanningComponent} from "app/entities/planning/planning.component";
import {NgModule} from "@angular/core";


const ENTITY_STATES = [...planningRoute];

@NgModule({
    imports: [LaFactoryFinalSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PlanningComponent
    ],
    entryComponents: [PlanningComponent]
})
export class LaFactoryFinalPlanningModule {}
