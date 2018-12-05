import { Component, OnInit } from '@angular/core';
import { IStagiaire } from 'app/shared/model/stagiaire.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { SalleService } from 'app/entities/salle';
import { JhiAlertService } from 'ng-jhipster';

@Component({
    selector: 'jhi-salle-stagiaires',
    templateUrl: './salle-stagiaires.component.html',
    styles: []
})
export class SalleStagiairesComponent implements OnInit {
    stagiaires: IStagiaire[];

    constructor(private salleService: SalleService, private jhiAlertService: JhiAlertService) {}

    ngOnInit() {}

    loadBySalleId(id: number) {
        this.salleService.findBySalleId(id).subscribe(
            (res: HttpResponse<IStagiaire[]>) => {
                this.stagiaires = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
