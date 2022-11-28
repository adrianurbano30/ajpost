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


@NgModule({
  declarations: [
    PublicacionesComponent,
    PublicacionItemComponent,
    CrearPublicacionComponent,
    ActualizarPublicacionComponent,
    EliminarPublicacionComponent
  ],
  imports: [
    CommonModule,
    PublicacionesRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatMenuModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
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
