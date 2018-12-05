/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LaFactoryFinalTestModule } from '../../../test.module';
import { ProjecteurComponent } from 'app/entities/projecteur/projecteur.component';
import { ProjecteurService } from 'app/entities/projecteur/projecteur.service';
import { Projecteur } from 'app/shared/model/projecteur.model';

describe('Component Tests', () => {
    describe('Projecteur Management Component', () => {
        let comp: ProjecteurComponent;
        let fixture: ComponentFixture<ProjecteurComponent>;
        let service: ProjecteurService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LaFactoryFinalTestModule],
                declarations: [ProjecteurComponent],
                providers: []
            })
                .overrideTemplate(ProjecteurComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProjecteurComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProjecteurService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Projecteur(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.projecteurs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
