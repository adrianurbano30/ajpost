import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comentario } from '../modelos/Comentario';
import { Imagenes } from '../modelos/Imagenes';
import { Publicacion } from '../modelos/Publicacion';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  api:string='http://localhost/laravel/JWT_backend/public/api';

  constructor(private http:HttpClient) { }

 crearLike(publicacion:Publicacion):Observable<Publicacion>{
    let id= publicacion.id;
   return this.http.post<Publicacion>(`${this.api}/make_like`,id);
 }

 crearLikeComentario(comentario:Comentario):Observable<Comentario>{
   return this.http.post<Comentario>(`${this.api}/make_like_comentario`,comentario);
 }

 crearLikeImagen(image:Imagenes):Observable<Imagenes>{
  return this.http.post<Imagenes>(`${this.api}/make_like_img`,image);
 }

}
