import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicacionesRoutingModule } from './publicaciones-routing.module';
import { PublicacionesComponent } from './publicaciones.component';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from 'src/app/interceptors/jwt.interceptor';


@NgModule({
  declarations: [
    PublicacionesComponent
  ],
  imports: [
    CommonModule,
    PublicacionesRoutingModule,
    HttpClientModule
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
