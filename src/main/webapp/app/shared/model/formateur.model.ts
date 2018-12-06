import { IMatiere, Matiere } from 'app/shared/model//matiere.model';
import { IModule } from 'app/shared/model//module.model';

export interface IFormateur {
    id?: number;
    nom?: string;
    prenom?: string;
    coordonnees?: string;
    numeroRue?: number;
    rue?: string;
    codePostal?: string;
    ville?: string;
    matieres?: IMatiere[];
    modules?: IModule[];
    matieresDebutant?: IMatiere[];
    matieresIntermediaire?: IMatiere[];
    matieresAvance?: IMatiere[];
    matieresConfirme?: IMatiere[];
}

export class Formateur implements IFormateur {
    constructor(
        public id?: number,
        public nom?: string,
        public prenom?: string,
        public coordonnees?: string,
        public numeroRue?: number,
        public rue?: string,
        public codePostal?: string,
        public ville?: string,
        public matieres?: IMatiere[],
        public modules?: IModule[],
        public matieresDebutant?: IMatiere[],
        public matieresIntermediaire?: IMatiere[],
        public matieresAvance?: IMatiere[],
        public matieresConfirme?: IMatiere[]
    ) {}
}
