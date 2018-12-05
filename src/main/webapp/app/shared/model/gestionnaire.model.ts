import { ICursus } from 'app/shared/model//cursus.model';

export interface IGestionnaire {
    id?: number;
    nom?: string;
    prenom?: string;
    coordonnees?: string;
    numeroRue?: number;
    rue?: string;
    codePostal?: string;
    ville?: string;
    cursuses?: ICursus[];
}

export class Gestionnaire implements IGestionnaire {
    constructor(
        public id?: number,
        public nom?: string,
        public prenom?: string,
        public coordonnees?: string,
        public numeroRue?: number,
        public rue?: string,
        public codePostal?: string,
        public ville?: string,
        public cursuses?: ICursus[]
    ) {}
}
