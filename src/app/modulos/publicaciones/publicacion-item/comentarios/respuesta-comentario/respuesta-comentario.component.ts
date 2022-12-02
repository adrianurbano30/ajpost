import { Component,OnInit,Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faComment, faEllipsisV, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Comentario } from 'src/app/modelos/Comentario';
import { Like } from 'src/app/modelos/Like';
import { User } from 'src/app/modelos/User';
import { ComentarioService } from 'src/app/servicios/comentario.service';
import { LikeService } from 'src/app/servicios/like.service';
import { EliminarComentarioComponent } from '../modals/eliminar-comentario/eliminar-comentario.component';

@Component({
  selector: 'app-respuesta-comentario',
  templateUrl: './respuesta-comentario.component.html',
  styleUrls: ['./respuesta-comentario.component.scss']
})
export class RespuestaComentarioComponent implements OnInit{

@Input() respuesta!:Comentario;
@Input() UsuarioLogged!:User;
@Output() editar_respuesta_comentario:EventEmitter<Comentario> = new EventEmitter();
@Output() eliminar_respuesta_comentario:EventEmitter<Comentario> = new EventEmitter();

iconoMnuComentario=faEllipsisV;
iconoLike=faThumbsUp;
iconoComentarComentario=faComment;

megusta:Like[]=[];
respuestas_list:Comentario[]=[];

mnuCrudRespuestas!:Boolean;

respuesta_v_completa:Boolean=true;
editar_v_respuesta:Boolean=false;

vistaResponderRespuesta:Boolean=false;

ng_model_editar_respuesta_respuesta!:string;//<-VAR para guardar ng model de respuesta a respuesta
ng_model_respuesta_respuesta!:string;//<-VAR para guardar ng model de respuesta a respuesta

constructor(
  private modal:MatDialog,
  private likesvc:LikeService,
  private comentariosvc:ComentarioService
)
{}

ngOnInit(): void {
  this.loadlikes();
  this.loadRespuestas();
}

//CRUD LIKES

crearlike(){
  this.likesvc.crearLikeComentario(this.respuesta).subscribe((resp:any)=>{
    if (resp.data) {
      let like:Like= resp.data;
        this.megusta.push(like);
    }
    if (resp==0) {
      let indice = this.megusta.findIndex(mg=>mg.User?.id==this.UsuarioLogged.id);
      this.megusta.splice(indice,1);
    }
  });
}

likedBy(){
  let likeComment:Boolean=false;
  this.megusta.forEach(item => {
    if (item.User?.id==this.UsuarioLogged.id) {
      likeComment=true;
    }
  });
    return likeComment;
}

loadlikes(){
  this.respuesta.Likes?.forEach(rsplks => {
    this.megusta.push(rsplks);
  });
}

//END CRUD LIKES

//CRUD RESPUESTAS COMENTARIO

crearRespuesta_A_respuesta(){

  if (this.ng_model_respuesta_respuesta) {
    let respuesta:Comentario={
      id:this.respuesta.id,
      comentarios:this.ng_model_respuesta_respuesta,
      User:this.UsuarioLogged
    }

    this.comentariosvc.respuestaComentario(respuesta).subscribe((resp:any)=>{

      let respComentario:Comentario = resp.data;

      this.respuestas_list.unshift(respComentario);
      this.ng_model_respuesta_respuesta='';

    });

  }

}


editarRespuesta(){
  let resp:Comentario={
    id:this.respuesta.id,
    comentarios:this.ng_model_editar_respuesta_respuesta,
    comentarioable_id:this.respuesta.comentarioable_id,
    comentarioable_type:this.respuesta.comentarioable_type,
    editado:true,
    User:this.respuesta.User,
    parent_id:this.respuesta.parent_id,
    created_at:this.respuesta.created_at,
    updated_at:this.respuesta.updated_at,
  }
  this.editar_respuesta_comentario.emit(resp);
  this.editar_v_respuesta=false;
  this.respuesta_v_completa=true;
}

update_R_Emmited(respuesta:Comentario){
  this.comentariosvc.updateRespuesta(respuesta).subscribe((resp:any)=>{
    let response:Comentario=resp.data;
    let indice = this.respuestas_list.findIndex(rspitm=>rspitm.id==respuesta.id);
    this.respuestas_list[indice]=response;
  });
}

cancelarEdicion(){
  this.respuesta_v_completa=true;
  this.editar_v_respuesta=false;
  this.ng_model_editar_respuesta_respuesta='';
}

openUpdateRespuesta(){
  this.respuesta_v_completa = false;
  this.editar_v_respuesta= true;
  this.ng_model_editar_respuesta_respuesta = this.respuesta.comentarios;
}
openEliminarRespuesta(){
  const referenciaModal = this.modal.open(EliminarComentarioComponent);
  referenciaModal.afterClosed().subscribe(resp=>{
    if (resp) {
      this.eliminar_respuesta_comentario.emit(this.respuesta);
    }
  });
}

destroy_R_Emmited(respuesta:Comentario){
  this.comentariosvc.eliminarRespuesta(respuesta).subscribe((resp:any)=>{
    if (resp) {
      let indice = this.respuestas_list.findIndex(rspitm=>rspitm.id==respuesta.id);
      this.respuestas_list.splice(indice,1);
    }
  });
}

responderArespuestaVista(){
  this.vistaResponderRespuesta=!this.vistaResponderRespuesta;
    if (this.respuesta.User) {
      if (this.respuesta.User.id!=this.UsuarioLogged.id) {
        this.ng_model_respuesta_respuesta = this.respuesta.User.name;
      }
    }
}

loadRespuestas(){
  this.respuesta.Respuestas?.forEach(rr => {
    this.respuestas_list.push(rr);
  });
}

//END CRUD RESPUESTAS COMENTARIO


//************************************************************************************* */

cantArr(arr:any[]):Number{
  return arr.length;
}

mnuCrudCommentsHover(value:boolean){
  this.mnuCrudRespuestas = value;
}

}
