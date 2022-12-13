import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCalendarDay, faChevronLeft, faChevronRight, faComment, faEllipsisV, faThumbsUp, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Comentario } from 'src/app/modelos/Comentario';
import { Imagenes } from 'src/app/modelos/Imagenes';
import { Like } from 'src/app/modelos/Like';
import { Publicacion } from 'src/app/modelos/Publicacion';
import { User } from 'src/app/modelos/User';
import { ComentarioService } from 'src/app/servicios/comentario.service';
import { LikeService } from 'src/app/servicios/like.service';

@Component({
  selector: 'app-fotos-post',
  templateUrl: './fotos-post.component.html',
  styleUrls: ['./fotos-post.component.scss']
})
export class FotosPostComponent implements OnInit{

  publicacion!:Publicacion;
  indice:number=0;
  UsuarioLogged!:User;
  right = faChevronRight;
  left = faChevronLeft;
  iconoCalendario=faCalendarDay;
  iconoMnuPublicacion=faEllipsisV;
  iconoLike=faThumbsUp;
  iconoComentarios=faComment;
  iconoCerrar=faXmark;
  ng_module_comentario_imagen!:string;
  comentarios_img_list:Imagenes[]=[];


  listaUsuariosComentarios_show:boolean=false;
  listaUsuariosLikes_show:boolean=false;


  constructor(
    private routeract:ActivatedRoute,
    private comentariosvc:ComentarioService,
    private likesvc:LikeService,
    private router:Router,
  )
  {}
  ngOnInit(): void {
    this.indice = this.routeract.snapshot.queryParams['index'];
    this.publicacion = this.routeract.snapshot.data['publicacion'].data
    this.UsuarioLogged = this.routeract.snapshot.data['usuario'].user;
    this.loadCmtIMGS();
    //console.log('publicacion->',this.comentarios_img_list[this.indice]);
  }

  ////CRUD COMENTARIOS IMAGEN

  crearComentario(){
    if (this.ng_module_comentario_imagen) {

      let fd = new FormData();
      fd.append('usuario_id',String(this.UsuarioLogged.id));
      if (this.publicacion.Imagenes) {
        fd.append('imagen_id',String(this.publicacion.Imagenes[this.indice].id));
      }
      fd.append('comentario',String(this.ng_module_comentario_imagen));
      this.comentariosvc.comentarioImagen(fd).subscribe((resp:any)=>{

        let comentario_IMG:Comentario = resp.data;
        this.comentarios_img_list[this.indice].Comentarios?.unshift(comentario_IMG);

      });
      this.ng_module_comentario_imagen ='';

    }
  }

  editarComentario(comentario:Comentario){

    this.comentariosvc.actualizarComentarioImg(comentario).subscribe((resp:any)=>{

      let coment_img:Comentario = resp.data;

      let indice_cmt = this.comentarios_img_list[this.indice].Comentarios.findIndex(item=>item.id==coment_img.id);

      this.comentarios_img_list[this.indice].Comentarios[indice_cmt] = coment_img;

    });

  }
  eliminarComentario(comentario:Comentario){

    this.comentariosvc.eliminarComentarioImg(comentario).subscribe(resp=>{

      if (resp) {

        let indice_cmt_IMG = this.comentarios_img_list[this.indice].Comentarios.findIndex(item=>item.id==comentario.id);

        this.comentarios_img_list[this.indice].Comentarios.splice(indice_cmt_IMG,1);

      }

    });

  }

  loadCmtIMGS(){
    this.publicacion.Imagenes?.forEach(img => {
      this.comentarios_img_list.push(img);
    });
  }

  ////END CRUD COMENTARIOS IMAGEN
  //CRUD LIKES IMAGEN//

  crearLike(){

    this.likesvc.crearLikeImagen(this.comentarios_img_list[this.indice]).subscribe((resp:any)=>{

      if (resp.data) {

        let like:Like = resp.data;

        this.comentarios_img_list[this.indice].Likes?.unshift(like);

      }
      if (resp==0) {
        let indiceLike:any;
        indiceLike = this.comentarios_img_list[this.indice].Likes?.findIndex(item=>item.User?.id==this.UsuarioLogged.id);
        this.comentarios_img_list[this.indice].Likes?.splice(indiceLike,1);
      }

    });

  }

  likedBy():Boolean{
    let likeImg:Boolean=false;
    this.comentarios_img_list[this.indice].Likes?.forEach(lk => {
      if (lk.User?.id==this.UsuarioLogged.id) {
        likeImg = true;
      }
    });
    return likeImg;
  }

  cantLikesIMG():number{

    let i:any = 0;
    i = this.comentarios_img_list[this.indice].Likes?.length;

    return i;

   }

  //END CRUD LIKES IMAGEN//


  //////////////////*************************************************** */

  toleft(){
  if (this.publicacion.Imagenes) {

    if (this.indice==0) {
      this.indice = this.publicacion.Imagenes.length - 1;
    }else{
      this.indice--;
    }
  }


  }
  torigth(){
    if (this.publicacion.Imagenes) {
      if (this.indice  == (this.publicacion.Imagenes.length)-1) {
        this.indice=0;
      }else{
        this.indice++;
      }
    }
  }
  cantItemsArr(arr:any[]):number{
    let ret:any=0;
    if (arr) {
      ret = arr.length;
      return ret;
    }
    return ret;
  }
  routeback(){
    this.router.navigate(['..']);
  }

  cantComentariosIMG():number{

   let i:any = 0;
   i = this.comentarios_img_list[this.indice].Comentarios?.length;

   this.comentarios_img_list[this.indice].Comentarios?.forEach(ctIMG0 => {

    if (ctIMG0.Respuestas) {

      i = i + ctIMG0.Respuestas?.length;

      ctIMG0.Respuestas?.forEach(ctIMG1 => {

        if (ctIMG1.Respuestas) {

          i = i + ctIMG1.Respuestas.length;

          ctIMG1.Respuestas.forEach(ctIMG2 => {

            if (ctIMG2.Respuestas) {

              i = i + ctIMG2.Respuestas.length;

              ctIMG2.Respuestas.forEach(ctIMG3 => {

                if (ctIMG3.Respuestas) {

                  i = i + ctIMG3.Respuestas.length;

                  ctIMG3.Respuestas.forEach(ctIMG4 => {

                    if (ctIMG4.Respuestas) {

                      i = i + ctIMG4.Respuestas.length;

                      ctIMG4.Respuestas.forEach(ctIMG5 => {

                        if (ctIMG5.Respuestas) {

                          i = i + ctIMG5.Respuestas.length;

                          ctIMG5.Respuestas.forEach(ctIMG6 => {

                            if (ctIMG6.Respuestas) {

                              i = i + ctIMG6.Respuestas.length;

                              ctIMG6.Respuestas.forEach(ctIMG7 => {

                                if (ctIMG7.Respuestas) {

                                  i = i + ctIMG7.Respuestas.length;

                                  ctIMG7.Respuestas.forEach(ctIMG8 => {

                                    if (ctIMG8.Respuestas) {

                                      i = i + ctIMG8.Respuestas.length;

                                      ctIMG8.Respuestas.forEach(ctIMG9 => {

                                        if (ctIMG9.Respuestas) {

                                          i = i + ctIMG9.Respuestas.length;

                                          ctIMG9.Respuestas.forEach(ctIMG10 => {

                                            if (ctIMG10.Respuestas) {

                                              i = i + ctIMG10.Respuestas.length;


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

   return i


  }


}
