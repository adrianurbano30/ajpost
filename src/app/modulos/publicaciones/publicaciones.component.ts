import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCalendarDay, faCommentDots, faEllipsisV, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Publicacion } from 'src/app/modelos/Publicacion';
import { User } from 'src/app/modelos/User';
import { MatDialog } from '@angular/material/dialog';
import { CrearPublicacionComponent } from './modals/crear-publicacion/crear-publicacion.component';
import { PublicacionService } from 'src/app/servicios/publicacion.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.scss']
})
export class PublicacionesComponent implements OnInit{

  iconoCalendario=faCalendarDay;
  iconoMnuPublicacion=faEllipsisV;
  iconoLike=faThumbsUp;
  iconoComentarios=faCommentDots;
  UsuarioLogged!:User;
  publicaciones:Publicacion[]=[];

  constructor(
    private publicacionsvc:PublicacionService,
    private routeAct:ActivatedRoute,
    public modal:MatDialog,
    private cookiesvc:CookieService
    )
    {}
    ngOnInit(): void {
      this.UsuarioLogged = this.routeAct.snapshot.data['usuario'].user;
      this.publicaciones = this.routeAct.snapshot.data['publicaciones'].data;
    }

    //CRUD PUBLICACIONES

    crearpublicacion():void{

      const referenciaModal = this.modal.open(CrearPublicacionComponent,{
        data:this.UsuarioLogged
      });

      referenciaModal.afterClosed().subscribe(resultado=>{

        if (resultado) {
          let fd = new FormData();

          if (resultado[1]) {
            for (let index = 0; index < resultado[1].length; index++) {
              fd.append('images'+index,resultado[1][index],resultado[1][index].name);
            }
            fd.append('array_size',resultado[1].length);
          }
          if (resultado[0].body) {
            fd.append('publicacion_body',resultado[0].body);
          }

          this.publicacionsvc.crearPublicacion(fd).subscribe((resp:any)=>{

            let body_null:String;

            if (resp.data.body==null) {
              body_null='';
            }else{
              body_null=resp.data.body;
            }

            let post:Publicacion={
              id:Number(resp.data.id),
              body:String(body_null),
              Imagenes:resp.data.Imagenes,
              Likes:resp.data.Likes,
              created_at:new Date(resp.data.created_at),
              updated_at:new Date(resp.data.updated_at),
              user:this.UsuarioLogged
              }

              //let posty:Publicacion = resp.data;

              this.publicaciones.unshift(post);

          });

        }

      });

    }
    editarPublicacion(fd:FormData){
      this.publicacionsvc.actulizarPublicacion(fd).subscribe((resultado:any)=>{

        let post:Publicacion = resultado.data;

        let indice = this.publicaciones.findIndex(item=>item.id==post.id);
        this.publicaciones[indice]= post;

      });
    }
    eliminarPublicacion(publicacion:Publicacion){
      this.publicacionsvc.eliminarPublicacion(publicacion).subscribe(respuesta=>{
        if (respuesta) {

          let indice = this.publicaciones.indexOf(publicacion);
          this.publicaciones.splice(indice,1);

        }
      });
    }

    //END CRUD PUBLICACIONES



}
