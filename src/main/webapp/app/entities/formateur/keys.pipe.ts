import { Pipe, PipeTransform } from '@angular/core';
import {Formateur} from "app/shared/model/formateur.model";

@Pipe({
    name: 'keys'
})
export class KeysPipe implements PipeTransform {

    public transform(formateurs: Formateur[], searchTerm?: string): Formateur[] {
        if(!formateurs || !searchTerm){
            return formateurs;
        }
        return formateurs.filter(formateur =>
            formateur.nom.toUpperCase().indexOf(searchTerm.toUpperCase()) !== -1);

    }

}
