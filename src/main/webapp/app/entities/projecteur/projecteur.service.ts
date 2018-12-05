import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProjecteur } from 'app/shared/model/projecteur.model';

type EntityResponseType = HttpResponse<IProjecteur>;
type EntityArrayResponseType = HttpResponse<IProjecteur[]>;

@Injectable({ providedIn: 'root' })
export class ProjecteurService {
    public resourceUrl = SERVER_API_URL + 'api/projecteurs';

    constructor(private http: HttpClient) {}

    create(projecteur: IProjecteur): Observable<EntityResponseType> {
        return this.http.post<IProjecteur>(this.resourceUrl, projecteur, { observe: 'response' });
    }

    update(projecteur: IProjecteur): Observable<EntityResponseType> {
        return this.http.put<IProjecteur>(this.resourceUrl, projecteur, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IProjecteur>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IProjecteur[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
