/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { LaFactoryFinalTestModule } from '../../../test.module';
import { StagiaireDeleteDialogComponent } from 'app/entities/stagiaire/stagiaire-delete-dialog.component';
import { StagiaireService } from 'app/entities/stagiaire/stagiaire.service';

describe('Component Tests', () => {
    describe('Stagiaire Management Delete Component', () => {
        let comp: StagiaireDeleteDialogComponent;
        let fixture: ComponentFixture<StagiaireDeleteDialogComponent>;
        let service: StagiaireService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LaFactoryFinalTestModule],
                declarations: [StagiaireDeleteDialogComponent]
            })
                .overrideTemplate(StagiaireDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StagiaireDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StagiaireService);
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
