import { Component,Input,Output,EventEmitter, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faCalendarDay, faComment, faEllipsisV, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Comentario } from 'src/app/modelos/Comentario';
import { Like } from 'src/app/modelos/Like';
import { Publicacion } from 'src/app/modelos/Publicacion';
import { User } from 'src/app/modelos/User';
import { LikeService } from 'src/app/servicios/like.service';
import { ActualizarPublicacionComponent } from '../modals/actualizar-publicacion/actualizar-publicacion.component';
import { EliminarPublicacionComponent } from '../modals/eliminar-publicacion/eliminar-publicacion.component';

@Component({
  selector: 'app-publicacion-item',
  templateUrl: './publicacion-item.component.html',
  styleUrls: ['./publicacion-item.component.scss']
})
export class PublicacionItemComponent implements OnInit{

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
  usuariosLike:User[]=[];
  userWhoCommenpost:User[]=[];
  whoLikepost:Boolean=false;
  whoCommentPost:Boolean=false;
  megustaMSG:boolean=false;
  comentariosMSG:boolean=false;
  comentarioslista:Boolean=false;
  mnuCrudComentarios:Boolean=false;
  comentario!:string;

  constructor(
    private modal:MatDialog,
    private likesvc:LikeService
  )
  {}
  ngOnInit(): void {

    this.loadMegusta();

  }

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

    this.likesvc.crearLike(this.publicacion).subscribe((respuesta:any)=>{

        if (respuesta.data) {

          let like:Like = {
            id:Number(respuesta.data.id),
            User:respuesta.data.User,
            likeable_id:Number(respuesta.data.likeable_id),
            likeable_type:String(respuesta.data.likeable_type),
            created_at:new Date(respuesta.data.created_at),
            updated_at:new Date(respuesta.data.updated_at)
          }
          let usuario:User={
              id:Number(like.User?.id),
              name:String(like.User?.name),
              lastname:String(like.User?.lastname),
              username:String(like.User?.username),
              foto_perfil:String(like.User?.foto_perfil)

          }

          this.usuariosLike.unshift(usuario);
          this.megusta.push(like);

        }

        if (respuesta == 0) {

          let indicelk = this.megusta.findIndex(item=>item.User?.id==this.UsuarioLogged.id);
          let indiceU = this.usuariosLike.findIndex(item=>item.id==this.UsuarioLogged.id)
          this.megusta.splice(indicelk,1);
          this.usuariosLike.splice(indiceU,1);

        }
    });

  }

  likedBy():Boolean{
    let likePost:Boolean=false;
    this.megusta.forEach(item => {
      if (item.User?.id==this.UsuarioLogged.id) {
        likePost=true;
      }
    });
      return likePost;
  }

  loadMegusta(){
    if (this.publicacion.Likes) {
        this.publicacion.Likes.forEach(pl => {
        this.megusta.push(pl);
      });
    }

    this.megusta.forEach(Ul => {
      if (Ul.User) {
        this.usuariosLike.push(Ul.User);
      }
    });
  }

  //END CRUD LIKES

  //CRUD COMENTARIOS

  cantComentarios():Number{
    return 0;
  }

  //END CRUD COMENTARIOS



  cantElementosArray(array:any[]):number{
    return array.length;
  }

}
