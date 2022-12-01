import { Component,Input,Output,EventEmitter, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faCalendarDay, faComment, faEllipsisV, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Comentario } from 'src/app/modelos/Comentario';
import { Like } from 'src/app/modelos/Like';
import { Publicacion } from 'src/app/modelos/Publicacion';
import { User } from 'src/app/modelos/User';
import { ComentarioService } from 'src/app/servicios/comentario.service';
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
  usuariosComentario:User[]=[];
  usuariosUnicosComentario:User[]=[];
  whoLikepost:Boolean=false;
  whoCommentPost:Boolean=false;
  megustaMSG:boolean=false;
  comentariosMSG:boolean=false;
  comentarioslista:Boolean=false;
  mnuCrudComentarios:Boolean=false;
  comentario!:string;

  constructor(
    private modal:MatDialog,
    private likesvc:LikeService,
    private comentariosvc:ComentarioService,
  )
  {}
  ngOnInit(): void {
    this.loadMegusta();
    this.loadComentarios();
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

  crear_comentario(){

    if (this.comentario) {

      let fd = new FormData();
      fd.append('usuario_id',String(this.UsuarioLogged.id));
      fd.append('publicacion_id',String(this.publicacion.id));
      fd.append('comentario',String(this.comentario));


      this.comentariosvc.crearComentario(fd).subscribe((respuesta:any)=>{

        let comentariu:Comentario = respuesta.data;

        this.comentariosList.unshift(comentariu);

        // if(!this.usuariosComentario.find(usr=>usr.id==respuesta.data.User.id)){
        //   this.usuariosComentario.unshift(respuesta.data.User);
        // }

        this.usuariosComentario.unshift(respuesta.data.User);

      });
      this.comentario='';
    }

  }

  editarComentario(comentario:Comentario){

    this.comentariosvc.actualizarComentario(comentario).subscribe((resp:any)=>{

      let comentando:Comentario={
        id:Number(resp.data.id),
        comentarios:String(resp.data.comentarios),
        comentarioable_id:Number(resp.data.comentarioable_id),
        comentarioable_type:String(resp.data.comentarioable_type),
        editado:resp.data.editado,
        parent_id:Number(resp.data.parent_id),
        Respuestas:resp.data.Respuestas,
        User:resp.data.User,
        created_at:new Date(resp.data.created_at),
        updated_at:new Date(resp.data.updated_at),
      }

      let indice = this.comentariosList.findIndex(cmt=>cmt.id==comentando.id);

      this.comentariosList[indice]=comentando;

    });

  }

  eliminarComentario(comentario:Comentario){
    this.comentariosvc.eliminarComentario(comentario).subscribe(resp=>{

      if (resp) {

        let indice = this.comentariosList.findIndex(cmt=>cmt.id== comentario.id);
        let indiceU = this.usuariosComentario.findIndex(uc=>uc.id==comentario.User?.id);
        this.usuariosComentario.splice(indiceU,1);
        this.comentariosList.splice(indice,1);
      }

    });
  }

  loadComentarios(){

    if (this.publicacion.Comentarios) {
      this.publicacion.Comentarios.forEach(element => {
        this.comentariosList.unshift(element);
      });
    }

    this.comentariosList.forEach(clU => {

      let usuario:User={
        id:Number(clU.User?.id),
        name:String(clU.User?.name),
        lastname:String(clU.User?.lastname),
        username:String(clU.User?.username),
        foto_perfil:String(clU.User?.foto_perfil)
      }

      // if(!this.usuariosComentario.find(usr=>usr.id==usuario.id)){
      //   this.usuariosComentario.push(usuario);
      // }
      this.usuariosComentario.push(usuario);

    });
  }

  //END CRUD COMENTARIOS



  cantElementosArray(array:any[]):number{
    return array.length;
  }

}
