import { ISalle } from 'app/shared/model//salle.model';

export interface IProjecteur {
    id?: number;
    code?: string;
    cout?: number;
    salle?: ISalle;
}

export class Projecteur implements IProjecteur {
    constructor(public id?: number, public code?: string, public cout?: number, public salle?: ISalle) {}
}
