import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICursus } from 'app/shared/model/cursus.model';

type EntityResponseType = HttpResponse<ICursus>;
type EntityArrayResponseType = HttpResponse<ICursus[]>;

@Injectable({ providedIn: 'root' })
export class CursusService {
    public resourceUrl = SERVER_API_URL + 'api/cursuses';

    constructor(private http: HttpClient) {}

    create(cursus: ICursus): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(cursus);
        return this.http
            .post<ICursus>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(cursus: ICursus): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(cursus);
        return this.http
            .put<ICursus>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ICursus>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICursus[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(cursus: ICursus): ICursus {
        const copy: ICursus = Object.assign({}, cursus, {
            dateDebut: cursus.dateDebut != null && cursus.dateDebut.isValid() ? cursus.dateDebut.format(DATE_FORMAT) : null,
            dateFin: cursus.dateFin != null && cursus.dateFin.isValid() ? cursus.dateFin.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.dateDebut = res.body.dateDebut != null ? moment(res.body.dateDebut) : null;
            res.body.dateFin = res.body.dateFin != null ? moment(res.body.dateFin) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((cursus: ICursus) => {
                cursus.dateDebut = cursus.dateDebut != null ? moment(cursus.dateDebut) : null;
                cursus.dateFin = cursus.dateFin != null ? moment(cursus.dateFin) : null;
            });
        }
        return res;
    }
}
