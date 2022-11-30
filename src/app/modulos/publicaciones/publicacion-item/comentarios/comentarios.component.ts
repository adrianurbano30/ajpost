import { Component,Output,Input,EventEmitter,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faComment, faEllipsisV, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Comentario } from 'src/app/modelos/Comentario';
import { Like } from 'src/app/modelos/Like';
import { User } from 'src/app/modelos/User';
import { LikeService } from 'src/app/servicios/like.service';
import { EliminarComentarioComponent } from './modals/eliminar-comentario/eliminar-comentario.component';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss']
})
export class ComentariosComponent implements OnInit{

  @Input () Comentario!:Comentario;
  @Input() UsuarioLogged!:User;
  @Output() editarComentario:EventEmitter<Comentario>=new EventEmitter();
  @Output() eliminarComentario:EventEmitter<Comentario>=new EventEmitter();

  iconoMnuComentario=faEllipsisV;
  iconoLike=faThumbsUp;
  iconoComentarComentario=faComment;

  comentario_list:Comentario[]=[];
  megusta:Like[]=[];
  usersLikeComentario:User[]=[];


  ng_model_editar_comentario!:string;//<-VAR para guardar en el ngmodel de edicion de comentario
  ng_model_respuesta_comentario!:string;//<-VAR para guardar ng model de respuesta a comentario


  mnuCrudComentarios:Boolean=false;
  mnuCrudRespuestas:Boolean=false;



  vistaResponderComentario:Boolean=false;

  completeComment_!:Boolean;
  editComment_:Boolean=false;

  cantidadUsuariosLikeComentario!:Boolean;


  constructor(
    private likesvc:LikeService,
    private modal:MatDialog
  )
  {}
  ngOnInit(): void {
    this.completeComment_=true;
  }


  //CRUD COMENTARIOS

  editarCommentario(){

    let editComentario:Comentario={
      id:this.Comentario.id,
      comentarios:this.ng_model_editar_comentario,
      created_at:this.Comentario.created_at,
      updated_at:this.Comentario.updated_at,
      editado:true,
      User:this.Comentario.User,
      comentarioable_id:this.Comentario.comentarioable_id,
      comentarioable_type:this.Comentario.comentarioable_type,
      parent_id:this.Comentario.parent_id,
    }
    this.editarComentario.emit(editComentario);
    this.editComment_=false;
    this.completeComment_=true;

  }

  cancelarEdicion(){
    this.completeComment_=true;
    this.editComment_=false;
    this.ng_model_editar_comentario='';
  }

  eliminarCommentario(){
    const referenciaModal = this.modal.open(EliminarComentarioComponent);

    referenciaModal.afterClosed().subscribe(resp=>{
      if (resp) {
        this.eliminarComentario.emit(this.Comentario);
      }
    });

  }

  responderAcomentarioVista(){

    this.vistaResponderComentario =! this.vistaResponderComentario;

    if (this.Comentario.User) {
      if (this.Comentario.User.id!=this.UsuarioLogged.id) {
        this.ng_model_respuesta_comentario = this.Comentario.User.name;
      }
    }
  }

  respuestaComentario(){
  }

  openUpdateComentario(){
    this.completeComment_=false;
    this.editComment_=true;
    this.ng_model_editar_comentario=this.Comentario.comentarios;
  }

  //END CRUD COMENTARIOS

  //CRUD LIKES

  crearLike(){
    this.likesvc.crearLikeComentario(this.Comentario).subscribe((respuesta:any)=>{

      if (respuesta.data) {
        let like:Like = respuesta.data;
          this.megusta.push(like);
      }
      if (respuesta==0) {
        let indice = this.megusta.findIndex(mg=>mg.User?.id==this.UsuarioLogged.id);
        this.megusta.splice(indice,1);
      }

    });
  }

  likedBy():Boolean{
    let likeComment:Boolean=false;
    this.megusta.forEach(item => {
      if (item.User?.id==this.UsuarioLogged.id) {
        likeComment=true;
      }
    });
      return likeComment;
  }

  //END CRUD LIKES




 ///*********************************************************************************************************************** */

  mnuCrudCommentsHover(value:boolean){
    this.mnuCrudComentarios = value;
  }

  cantElementosArray(array:any[]):number{
    return array.length;
  }


}
