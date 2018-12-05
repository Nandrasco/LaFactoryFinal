/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { LaFactoryFinalTestModule } from '../../../test.module';
import { ProjecteurDeleteDialogComponent } from 'app/entities/projecteur/projecteur-delete-dialog.component';
import { ProjecteurService } from 'app/entities/projecteur/projecteur.service';

describe('Component Tests', () => {
    describe('Projecteur Management Delete Component', () => {
        let comp: ProjecteurDeleteDialogComponent;
        let fixture: ComponentFixture<ProjecteurDeleteDialogComponent>;
        let service: ProjecteurService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LaFactoryFinalTestModule],
                declarations: [ProjecteurDeleteDialogComponent]
            })
                .overrideTemplate(ProjecteurDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProjecteurDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProjecteurService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
