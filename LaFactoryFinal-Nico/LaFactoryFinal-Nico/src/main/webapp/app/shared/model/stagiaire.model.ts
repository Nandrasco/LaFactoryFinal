import { IOrdinateur } from 'app/shared/model//ordinateur.model';
import { ICursus } from 'app/shared/model//cursus.model';

export interface IStagiaire {
    id?: number;
    nom?: string;
    prenom?: string;
    coordonnees?: string;
    numeroRue?: number;
    rue?: string;
    codePostal?: string;
    ville?: string;
    ordinateur?: IOrdinateur;
    cursuses?: ICursus[];
}

export class Stagiaire implements IStagiaire {
    constructor(
        public id?: number,
        public nom?: string,
        public prenom?: string,
        public coordonnees?: string,
        public numeroRue?: number,
        public rue?: string,
        public codePostal?: string,
        public ville?: string,
        public ordinateur?: IOrdinateur,
        public cursuses?: ICursus[]
    ) {}
}
