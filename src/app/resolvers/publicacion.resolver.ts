import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Publicacion } from '../modelos/Publicacion';
import { PublicacionService } from '../servicios/publicacion.service';

@Injectable({
  providedIn: 'root'
})
export class PublicacionResolver implements Resolve<Publicacion[]> {

  publicaciones:Publicacion[]=[];

  constructor(private publicacionsvc:PublicacionService)
  {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Publicacion[]> {

    return this.publicacionsvc.getpublicaciones();

  }
}
