import { Component,Input,Output,EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faCalendarDay, faComment, faEllipsisV, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Comentario } from 'src/app/modelos/Comentario';
import { Like } from 'src/app/modelos/Like';
import { Publicacion } from 'src/app/modelos/Publicacion';
import { User } from 'src/app/modelos/User';
import { ActualizarPublicacionComponent } from '../modals/actualizar-publicacion/actualizar-publicacion.component';
import { EliminarPublicacionComponent } from '../modals/eliminar-publicacion/eliminar-publicacion.component';

@Component({
  selector: 'app-publicacion-item',
  templateUrl: './publicacion-item.component.html',
  styleUrls: ['./publicacion-item.component.scss']
})
export class PublicacionItemComponent {

  @Input () publicacion!:Publicacion;
  @Input() UsuarioLogged!:User;
  @Output() editarPublicacion:EventEmitter<FormData> = new EventEmitter();
  @Output() eliminarPublicacion:EventEmitter<Publicacion> = new EventEmitter();

  iconoCalendario=faCalendarDay;
  iconoMnuPublicacion=faEllipsisV;
  iconoLike=faThumbsUp;
  iconoComentarios=faComment;
  megusta:Like[]=[];
  comentariosList:Comentario[]=[];
  usersWholikepost:User[]=[];
  userWhoCommenpost:User[]=[];
  whoLikepost:Boolean=false;
  whoCommentPost:Boolean=false;
  megustaMSG:boolean=false;
  comentariosMSG:boolean=false;
  comentarioslista:Boolean=false;
  mnuCrudComentarios:Boolean=false;
  comentario!:string;

  constructor(
    private modal:MatDialog
  )
  {}

  //CRUD PUBLICACIONES
  abrirModalActualizarPublicacion():void{

    const referenciaModal = this.modal.open(ActualizarPublicacionComponent,{
      data:{usuario:this.UsuarioLogged,publicacion:this.publicacion}
    });

    referenciaModal.disableClose=true;

    referenciaModal.afterClosed().subscribe((respuesta:any)=>{

      if (respuesta) {

        let post:Publicacion = {
          id:this.publicacion.id,
          body:respuesta[0].body,
          user:this.publicacion.user,
          created_at:this.publicacion.created_at,
          updated_at:this.publicacion.updated_at
        }

        let fd = new FormData();

        fd.append('publicacion_id',String(post.id));

        if (respuesta[0].body) {
          fd.append('publicacion_body',post.body);
        }

        if (respuesta[1]) {
          for (let index = 0; index < respuesta[1].length; index++) {
            fd.append('images'+index,respuesta[1][index],respuesta[1][index].name);
          }
          fd.append('array_size1',respuesta[1].length);
        }

        if (respuesta[2]) {
          fd.append('img2delete',JSON.stringify(respuesta[2]));
          fd.append('array_size2',respuesta[2].length);
        }

        this.editarPublicacion.emit(fd);

      }

    });

  }
  abrirModalEliminarPublicacion():void{
    const referenciaModal = this.modal.open(EliminarPublicacionComponent,{
      data:{usuario:this.UsuarioLogged,publicacion:this.publicacion}
    });

    referenciaModal.afterClosed().subscribe(resp=>{
      if (resp && resp==this.publicacion.id) {
        this.eliminarPublicacion.emit(this.publicacion);
      }
    });

  }
  // END CRUD PUBLICACIONES

  //CRUD LIKES

  crearlike(){

  }

  likedBy(){

  }

  cantLikes():Number{
    return 0;
  }

  //END CRUD LIKES

  cantidadImagenesPublicadas(array:any[]):number{
    return array.length;
  }

}
