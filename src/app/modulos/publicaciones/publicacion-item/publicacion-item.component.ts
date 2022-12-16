import { Component,Input,Output,EventEmitter, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faCalendarDay, faComment, faEllipsisV, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Comentario } from 'src/app/modelos/Comentario';
import { Like } from 'src/app/modelos/Like';
import { Publicacion } from 'src/app/modelos/Publicacion';
import { User } from 'src/app/modelos/User';
import { ComentarioService } from 'src/app/servicios/comentario.service';
import { LikeService } from 'src/app/servicios/like.service';
import { PostPhotoDataService } from 'src/app/servicios/post-photo-data.service';
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
    private post_photo_data_svc:PostPhotoDataService,
  )
  {}
  ngOnInit(): void {
    this.loadMegusta();
    this.loadComentarios();
  }

  ////////////////////***************************************
  fotos_post(){
    this.post_photo_data_svc.publicacion = this.publicacion;
    this.post_photo_data_svc.UsuarioLogged = this.UsuarioLogged;
  }
  ////////////////////***************************************

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
      this.usuariosComentario.push(usuario);

      if (clU.Respuestas) {

        clU.Respuestas.forEach(clU1 => {

          if (clU1.User) {
            this.usuariosComentario.push(clU1.User);

              clU1.Respuestas?.forEach(clU2 => {

                if (clU2.User) {

                  this.usuariosComentario.push(clU2.User);

                  clU2.Respuestas?.forEach(clU3 => {

                    if (clU3.User) {

                      this.usuariosComentario.push(clU3.User);

                      clU3.Respuestas?.forEach(clU4 => {

                        if (clU4.User) {

                          this.usuariosComentario.push(clU4.User);

                          clU4.Respuestas?.forEach(clU5 => {

                            if (clU5.User) {

                              this.usuariosComentario.push(clU5.User);

                              clU5.Respuestas?.forEach(clU6 => {

                                if (clU6.User) {

                                  this.usuariosComentario.push(clU6.User);

                                  clU6.Respuestas?.forEach(clU7 => {

                                    if (clU7.User) {

                                      this.usuariosComentario.push(clU7.User);

                                      clU7.Respuestas?.forEach(clU8 => {

                                        if (clU8.User) {

                                          this.usuariosComentario.push(clU8.User);

                                          clU8.Respuestas?.forEach(clU9 => {

                                            if (clU9.User) {

                                              this.usuariosComentario.push(clU9.User);

                                              clU9.Respuestas?.forEach(clU10 => {

                                                if (clU10.User) {

                                                  this.usuariosComentario.push(clU10.User);

                                                  clU10.Respuestas?.forEach(clU11 => {

                                                    if (clU11.User) {

                                                      this.usuariosComentario.push(clU11.User);

                                                      clU11.Respuestas?.forEach(clU12 => {

                                                        if (clU12.User) {

                                                          this.usuariosComentario.push(clU12.User);

                                                          clU12.Respuestas?.forEach(clU13 => {

                                                            if (clU13.User) {

                                                              this.usuariosComentario.push(clU13.User);

                                                              clU13.Respuestas?.forEach(clU14 => {

                                                                if (clU14.User) {

                                                                  this.usuariosComentario.push(clU14.User);

                                                                  clU14.Respuestas?.forEach(clU15 => {

                                                                    if (clU15.User) {

                                                                      this.usuariosComentario.push(clU15.User);

                                                                      clU15.Respuestas?.forEach(clU16 => {

                                                                        if (clU16.User) {

                                                                          this.usuariosComentario.push(clU16.User);

                                                                          clU16.Respuestas?.forEach(clU17 => {

                                                                            if (clU17.User) {

                                                                              this.usuariosComentario.push(clU17.User);

                                                                              clU17.Respuestas?.forEach(clU18 => {

                                                                                if (clU18.User) {

                                                                                  this.usuariosComentario.push(clU18.User);

                                                                                  clU18.Respuestas?.forEach(clU19 => {

                                                                                    if (clU19.User) {

                                                                                      this.usuariosComentario.push(clU19.User);

                                                                                      clU19.Respuestas?.forEach(clU20 => {

                                                                                        if (clU20.User) {

                                                                                          this.usuariosComentario.push(clU20.User);

                                                                                        }

                                                                                      });

                                                                                    }

                                                                                  });

                                                                                }

                                                                              });

                                                                            }

                                                                          });

                                                                        }

                                                                      });

                                                                    }

                                                                  });

                                                                }

                                                              });

                                                            }

                                                          });

                                                        }

                                                      });

                                                    }

                                                  });

                                                }

                                              });

                                            }

                                          });

                                        }

                                      });

                                    }

                                  });

                                }

                              });

                            }

                          });

                        }

                      });

                    }

                  });

                }

            });

          }


        });

      }

    });
  }

  //END CRUD COMENTARIOS

  cantElementosArray(array:any[]):number{
    return array.length;
  }

  cantComentariosPost():Number{

    let contador:number=0;

    contador = contador + this.comentariosList.length;

    this.comentariosList.forEach(CL => {

      if (CL.Respuestas) {

        contador = contador + CL.Respuestas?.length;

        CL.Respuestas.forEach(Rc => {

          if (Rc.Respuestas) {

            contador = contador + Rc.Respuestas.length;

            Rc.Respuestas.forEach(RR => {

              if (RR.Respuestas) {

                contador = contador + RR.Respuestas.length;

                RR.Respuestas.forEach(Rr => {

                  if (Rr.Respuestas) {

                    contador = contador + Rr.Respuestas.length;

                    Rr.Respuestas.forEach(Rr1 => {

                      if (Rr1.Respuestas) {

                        contador = contador + Rr1.Respuestas.length;

                        Rr1.Respuestas.forEach(Rr2 => {

                          if (Rr2.Respuestas) {

                            contador = contador + Rr2.Respuestas.length;

                            Rr2.Respuestas.forEach(Rr3 => {

                              if (Rr3.Respuestas) {

                                contador = contador + Rr3.Respuestas.length;

                                Rr3.Respuestas.forEach(Rr4 => {

                                  if (Rr4.Respuestas) {

                                    contador = contador + Rr4.Respuestas.length;

                                    Rr4.Respuestas.forEach(Rr5 => {

                                      if (Rr5.Respuestas) {

                                        contador = contador + Rr5.Respuestas.length;

                                        Rr5.Respuestas.forEach(Rr6 => {

                                          if (Rr6.Respuestas) {

                                            contador = contador + Rr6.Respuestas.length;

                                            Rr6.Respuestas.forEach(Rr7 => {

                                              if (Rr7.Respuestas) {

                                                contador = contador + Rr7.Respuestas.length;

                                                Rr7.Respuestas.forEach(Rr8 => {

                                                  if (Rr8.Respuestas) {

                                                    contador = contador + Rr8.Respuestas.length;

                                                    Rr8.Respuestas.forEach(Rr9 => {

                                                      if (Rr9.Respuestas) {

                                                        contador = contador + Rr9.Respuestas.length;

                                                        Rr9.Respuestas.forEach(Rr10 => {

                                                          if (Rr10.Respuestas) {

                                                            contador = contador + Rr10.Respuestas.length;

                                                            Rr10.Respuestas.forEach(Rr11 => {

                                                              if (Rr11.Respuestas) {

                                                                contador = contador + Rr11.Respuestas.length;

                                                                Rr11.Respuestas.forEach(Rr12 => {

                                                                  if (Rr12.Respuestas) {

                                                                    contador = contador + Rr12.Respuestas.length;

                                                                    Rr12.Respuestas.forEach(Rr13 => {

                                                                      if (Rr13.Respuestas) {

                                                                        contador = contador + Rr13.Respuestas.length;

                                                                        Rr13.Respuestas.forEach(Rr14 => {

                                                                          if (Rr14.Respuestas) {

                                                                            contador = contador + Rr14.Respuestas.length;

                                                                            Rr14.Respuestas.forEach(Rr15 => {

                                                                              if (Rr15.Respuestas) {

                                                                                contador = contador + Rr15.Respuestas.length;

                                                                                Rr15.Respuestas.forEach(Rr16 => {

                                                                                  if (Rr16.Respuestas) {

                                                                                    contador = contador + Rr16.Respuestas.length;

                                                                                    Rr16.Respuestas.forEach(Rr17 => {

                                                                                      if (Rr17.Respuestas) {

                                                                                        contador = contador + Rr17.Respuestas.length;

                                                                                        Rr17.Respuestas.forEach(Rr18 => {

                                                                                          if (Rr18.Respuestas) {

                                                                                            contador = contador + Rr18.Respuestas.length;

                                                                                            Rr18.Respuestas.forEach(Rr19 => {

                                                                                              if (Rr19.Respuestas) {

                                                                                                contador = contador + Rr19.Respuestas.length;

                                                                                                Rr19.Respuestas.forEach(Rr20 => {

                                                                                                  if (Rr20.Respuestas) {

                                                                                                    contador = contador + Rr20.Respuestas.length;

                                                                                                    Rr20.Respuestas.forEach(Rr21 => {

                                                                                                      if (Rr21.Respuestas) {

                                                                                                        contador = contador + Rr21.Respuestas.length;

                                                                                                      }

                                                                                                    });

                                                                                                  }

                                                                                                });

                                                                                              }

                                                                                            });

                                                                                          }

                                                                                        });

                                                                                      }

                                                                                    });

                                                                                  }

                                                                                });

                                                                              }

                                                                            });

                                                                          }

                                                                        });

                                                                      }

                                                                    });

                                                                  }

                                                                });

                                                              }

                                                            });

                                                          }

                                                        });


                                                      }

                                                    });

                                                  }

                                                });

                                              }

                                            });

                                          }

                                        });

                                      }

                                    });


                                  }

                                });


                              }

                            });

                          }

                        });


                      }

                    });

                  }

                });

              }

            });


          }

        });

      }
    });



    return contador;

  }

}
