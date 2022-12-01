import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../modelos/User';

@Pipe({
  name: 'ordenamientoUsuarios'
})
export class OrdenamientoUsuariosPipe implements PipeTransform {

  transform(values:User[]): User[] {

    const unicos:User[]=[];

    for (let index = 0; index < values.length; index++) {
      const element = values[index];


      if (!unicos.find(usr=>usr.id==values[index].id) ) {
        unicos.push(element);
      }
    }

    return unicos;

  }

}
