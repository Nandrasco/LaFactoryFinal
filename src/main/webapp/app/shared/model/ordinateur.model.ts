import { Moment } from 'moment';
import { IStagiaire } from 'app/shared/model//stagiaire.model';

export interface IOrdinateur {
    id?: number;
    code?: string;
    cout?: number;
    processeur?: string;
    ram?: number;
    dd?: number;
    dateAchat?: Moment;
    stock?: number;
    stagiaire?: IStagiaire;
}

export class Ordinateur implements IOrdinateur {
    constructor(
        public id?: number,
        public code?: string,
        public cout?: number,
        public processeur?: string,
        public ram?: number,
        public dd?: number,
        public dateAchat?: Moment,
        public stock?: number,
        public stagiaire?: IStagiaire
    ) {}
}
