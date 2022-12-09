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
export class PhotosResolver implements Resolve<Publicacion> {
  constructor(private publicacionesvc:PublicacionService){

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Publicacion> {

    let id:number = route.queryParams['post_id'];
    return this.publicacionesvc.getpublicacion(id);
  }
}
