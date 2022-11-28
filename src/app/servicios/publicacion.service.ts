import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Publicacion } from '../modelos/Publicacion';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  api:string='http://localhost/laravel/JWT_backend/public/api';

  constructor(private http:HttpClient) { }

  getpublicaciones():Observable<Publicacion[]>{
    return this.http.get<Publicacion[]>(`${this.api}/get_publicaciones`);
  }

  crearPublicacion(archivos:FormData):Observable<Publicacion>{
    const headers = new HttpHeaders();
    return this.http.post<Publicacion>(`${this.api}/make_publicacion`,archivos,{headers:headers});
  }
  actulizarPublicacion(archivos:FormData):Observable<Publicacion>{
    const headers = new HttpHeaders();
    return this.http.post<Publicacion>(`${this.api}/actualizarPublicacion`,archivos,{headers:headers});
  }
  eliminarPublicacion(publicacion:Publicacion):Observable<any>{
    return this.http.delete<any>(`${this.api}/eliminar_post/${publicacion.id}`);
  }
}
