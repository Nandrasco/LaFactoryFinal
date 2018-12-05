/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { LaFactoryFinalTestModule } from '../../../test.module';
import { ProjecteurUpdateComponent } from 'app/entities/projecteur/projecteur-update.component';
import { ProjecteurService } from 'app/entities/projecteur/projecteur.service';
import { Projecteur } from 'app/shared/model/projecteur.model';

describe('Component Tests', () => {
    describe('Projecteur Management Update Component', () => {
        let comp: ProjecteurUpdateComponent;
        let fixture: ComponentFixture<ProjecteurUpdateComponent>;
        let service: ProjecteurService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LaFactoryFinalTestModule],
                declarations: [ProjecteurUpdateComponent]
            })
                .overrideTemplate(ProjecteurUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProjecteurUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProjecteurService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Projecteur(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.projecteur = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Projecteur();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.projecteur = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
