import { IFormateur } from 'app/shared/model//formateur.model';
import { IModule } from 'app/shared/model//module.model';

export interface IMatiere {
    id?: number;
    nom?: string;
    formateurs?: IFormateur[];
    modules?: IModule[];
}

export class Matiere implements IMatiere {
    constructor(public id?: number, public nom?: string, public formateurs?: IFormateur[], public modules?: IModule[]) {}
}
