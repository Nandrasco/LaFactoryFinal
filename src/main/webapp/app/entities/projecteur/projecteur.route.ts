import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Projecteur } from 'app/shared/model/projecteur.model';
import { ProjecteurService } from './projecteur.service';
import { ProjecteurComponent } from './projecteur.component';
import { ProjecteurDetailComponent } from './projecteur-detail.component';
import { ProjecteurUpdateComponent } from './projecteur-update.component';
import { ProjecteurDeletePopupComponent } from './projecteur-delete-dialog.component';
import { IProjecteur } from 'app/shared/model/projecteur.model';

@Injectable({ providedIn: 'root' })
export class ProjecteurResolve implements Resolve<IProjecteur> {
    constructor(private service: ProjecteurService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Projecteur> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Projecteur>) => response.ok),
                map((projecteur: HttpResponse<Projecteur>) => projecteur.body)
            );
        }
        return of(new Projecteur());
    }
}

export const projecteurRoute: Routes = [
    {
        path: 'projecteur',
        component: ProjecteurComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_TECHNICIEN'],
            pageTitle: 'laFactoryFinalApp.projecteur.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'projecteur/:id/view',
        component: ProjecteurDetailComponent,
        resolve: {
            projecteur: ProjecteurResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_TECHNICIEN'],
            pageTitle: 'laFactoryFinalApp.projecteur.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'projecteur/new',
        component: ProjecteurUpdateComponent,
        resolve: {
            projecteur: ProjecteurResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_TECHNICIEN'],
            pageTitle: 'laFactoryFinalApp.projecteur.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'projecteur/:id/edit',
        component: ProjecteurUpdateComponent,
        resolve: {
            projecteur: ProjecteurResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_TECHNICIEN'],
            pageTitle: 'laFactoryFinalApp.projecteur.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const projecteurPopupRoute: Routes = [
    {
        path: 'projecteur/:id/delete',
        component: ProjecteurDeletePopupComponent,
        resolve: {
            projecteur: ProjecteurResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_TECHNICIEN'],
            pageTitle: 'laFactoryFinalApp.projecteur.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
