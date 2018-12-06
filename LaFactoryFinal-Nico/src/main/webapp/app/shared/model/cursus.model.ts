import { Moment } from 'moment';
import { IGestionnaire } from 'app/shared/model//gestionnaire.model';
import { ISalle } from 'app/shared/model//salle.model';
import { IStagiaire } from 'app/shared/model//stagiaire.model';
import { IModule } from 'app/shared/model//module.model';

export interface ICursus {
    id?: number;
    nom?: string;
    dateDebut?: Moment;
    dateFin?: Moment;
    prerequis?: string;
    objectifs?: string;
    contenu?: string;
    gestionnaire?: IGestionnaire;
    salle?: ISalle;
    stagiaires?: IStagiaire[];
    modules?: IModule[];
}

export class Cursus implements ICursus {
    constructor(
        public id?: number,
        public nom?: string,
        public dateDebut?: Moment,
        public dateFin?: Moment,
        public prerequis?: string,
        public objectifs?: string,
        public contenu?: string,
        public gestionnaire?: IGestionnaire,
        public salle?: ISalle,
        public stagiaires?: IStagiaire[],
        public modules?: IModule[]
    ) {}
}
