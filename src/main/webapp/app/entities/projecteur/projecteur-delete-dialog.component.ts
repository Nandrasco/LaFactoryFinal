import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProjecteur } from 'app/shared/model/projecteur.model';
import { ProjecteurService } from './projecteur.service';

@Component({
    selector: 'jhi-projecteur-delete-dialog',
    templateUrl: './projecteur-delete-dialog.component.html'
})
export class ProjecteurDeleteDialogComponent {
    projecteur: IProjecteur;

    constructor(private projecteurService: ProjecteurService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.projecteurService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'projecteurListModification',
                content: 'Deleted an projecteur'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-projecteur-delete-popup',
    template: ''
})
export class ProjecteurDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ projecteur }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ProjecteurDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.projecteur = projecteur;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
