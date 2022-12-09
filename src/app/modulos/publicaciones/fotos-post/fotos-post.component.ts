import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCalendarDay, faChevronLeft, faChevronRight, faComment, faEllipsisV, faThumbsUp, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Comentario } from 'src/app/modelos/Comentario';
import { Imagenes } from 'src/app/modelos/Imagenes';
import { Publicacion } from 'src/app/modelos/Publicacion';
import { User } from 'src/app/modelos/User';
import { ComentarioService } from 'src/app/servicios/comentario.service';

@Component({
  selector: 'app-fotos-post',
  templateUrl: './fotos-post.component.html',
  styleUrls: ['./fotos-post.component.scss']
})
export class FotosPostComponent implements OnInit{

  publicacion!:Publicacion;
  indice!:number;
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


  constructor(
    private routeract:ActivatedRoute,
    private comentariosvc:ComentarioService,
    private router:Router,
  )
  {}
  ngOnInit(): void {
    this.indice = this.routeract.snapshot.queryParams['index'];
    this.publicacion = this.routeract.snapshot.data['publicacion'].data
    this.UsuarioLogged = this.routeract.snapshot.data['usuario'].user;
    this.loadCmtIMGS();
  }

  crearComentario(){
    if (this.ng_module_comentario_imagen) {

      let fd = new FormData();
      fd.append('usuario_id',String(this.UsuarioLogged.id));
      if (this.publicacion.Imagenes) {
        fd.append('imagen_id',String(this.publicacion.Imagenes[this.indice].id));
      }
      fd.append('comentario',String(this.ng_module_comentario_imagen));
      this.comentariosvc.comentarioImagen(fd).subscribe((resp:any)=>{

        ///AQUI GUARDAMOS EN UN ARRAY TEMP LOS COMENTARIOS DE LA IMAGEN
        let comentario_IMG:Comentario = resp.data;
        this.comentarios_img_list[this.indice].Comentarios?.unshift(comentario_IMG);

      });
      this.ng_module_comentario_imagen ='';

    }
  }

  loadCmtIMGS(){
    this.publicacion.Imagenes?.forEach(img => {
      this.comentarios_img_list.push(img);
    });
  }


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
     let ret:number=0;
    if (arr) {
      ret = arr.length;
      return ret;
    }
    return ret;
  }

  routeback(){
    this.router.navigate(['..']);
  }


}
