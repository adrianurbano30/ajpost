import { Pipe, PipeTransform } from '@angular/core';
import { Comentario } from '../modelos/Comentario';
import { User } from '../modelos/User';

@Pipe({
  name: 'ordenamientoUsuariosComentariosImagenes'
})
export class OrdenamientoUsuariosComentariosImagenesPipe implements PipeTransform {

  transform(values:Comentario[]): User[] {

    const unicos: User[]=[];


    for (let index = 0; index < values.length; index++) {

        const element = values[index].User;

      if (element) {

        if (!unicos.find(usr=>usr?.id==values[index].User?.id)) {

          unicos.push(element);

        }
      }

    }


    return unicos;

  }

}
