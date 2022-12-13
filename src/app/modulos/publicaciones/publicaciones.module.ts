import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicacionesRoutingModule } from './publicaciones-routing.module';
import { PublicacionesComponent } from './publicaciones.component';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from 'src/app/interceptors/jwt.interceptor';
import { PublicacionItemComponent } from './publicacion-item/publicacion-item.component';
import { CrearPublicacionComponent } from './modals/crear-publicacion/crear-publicacion.component';
import { ActualizarPublicacionComponent } from './modals/actualizar-publicacion/actualizar-publicacion.component';
import { EliminarPublicacionComponent } from './modals/eliminar-publicacion/eliminar-publicacion.component';
import {MatDialogModule} from '@angular/material/dialog';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatMenuModule } from '@angular/material/menu';
import { ComentariosComponent } from './publicacion-item/comentarios/comentarios.component';
import { EliminarComentarioComponent } from './publicacion-item/comentarios/modals/eliminar-comentario/eliminar-comentario.component';
import { OrdenamientoUsuariosPipe } from 'src/app/pipes/ordenamiento-usuarios.pipe';
import { RespuestaComentarioComponent } from './publicacion-item/comentarios/respuesta-comentario/respuesta-comentario.component';
import { FotosPostComponent } from './fotos-post/fotos-post.component';
import { OrdenamientoUsuariosComentariosImagenesPipe } from 'src/app/pipes/ordenamiento-usuarios-comentarios-imagenes.pipe';


@NgModule({
  declarations: [
    PublicacionesComponent,
    PublicacionItemComponent,
    CrearPublicacionComponent,
    ActualizarPublicacionComponent,
    EliminarPublicacionComponent,
    ComentariosComponent,
    EliminarComentarioComponent,
    OrdenamientoUsuariosPipe,
    OrdenamientoUsuariosComentariosImagenesPipe,
    RespuestaComentarioComponent,
    FotosPostComponent

  ],
  imports: [
    CommonModule,
    PublicacionesRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatMenuModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  providers:[
    CookieService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:JwtInterceptor,
      multi:true
    }
  ]
})
export class PublicacionesModule { }
