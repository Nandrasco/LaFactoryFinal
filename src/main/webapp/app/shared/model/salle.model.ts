import { IProjecteur } from 'app/shared/model//projecteur.model';
import { ICursus } from 'app/shared/model//cursus.model';

export interface ISalle {
    id?: number;
    code?: string;
    cout?: number;
    capaciteMax?: number;
    projecteur?: IProjecteur;
    cursus?: ICursus;
}

export class Salle implements ISalle {
    constructor(
        public id?: number,
        public code?: string,
        public cout?: number,
        public capaciteMax?: number,
        public projecteur?: IProjecteur,
        public cursus?: ICursus
    ) {}
}
