/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LaFactoryFinalTestModule } from '../../../test.module';
import { ProjecteurDetailComponent } from 'app/entities/projecteur/projecteur-detail.component';
import { Projecteur } from 'app/shared/model/projecteur.model';

describe('Component Tests', () => {
    describe('Projecteur Management Detail Component', () => {
        let comp: ProjecteurDetailComponent;
        let fixture: ComponentFixture<ProjecteurDetailComponent>;
        const route = ({ data: of({ projecteur: new Projecteur(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LaFactoryFinalTestModule],
                declarations: [ProjecteurDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ProjecteurDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProjecteurDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.projecteur).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
