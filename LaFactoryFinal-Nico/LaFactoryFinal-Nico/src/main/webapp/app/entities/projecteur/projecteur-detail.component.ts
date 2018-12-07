import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProjecteur } from 'app/shared/model/projecteur.model';

@Component({
    selector: 'jhi-projecteur-detail',
    templateUrl: './projecteur-detail.component.html'
})
export class ProjecteurDetailComponent implements OnInit {
    projecteur: IProjecteur;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ projecteur }) => {
            this.projecteur = projecteur;
        });
    }

    previousState() {
        window.history.back();
    }
}
