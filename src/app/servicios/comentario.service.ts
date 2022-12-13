import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comentario } from '../modelos/Comentario';
import { Imagenes } from '../modelos/Imagenes';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  api:string='http://localhost/laravel/JWT_backend/public/api';

  constructor(private http:HttpClient) { }

  crearComentario(fd:FormData):Observable<Comentario>{
    return this.http.post<Comentario>(`${this.api}/make_comentario`,fd);
  }
  actualizarComentario(comentario:Comentario):Observable<Comentario>{
    return this.http.put<Comentario>(`${this.api}/update_comentario/${comentario.id}`,comentario);
  }
  eliminarComentario(Comentario:Comentario):Observable<Comentario>{
    return this.http.delete<Comentario>(`${this.api}/delete_comentario/${Comentario.id}`);
  }

  //COMENTARIO IMAGEN////

  comentarioImagen(fd:FormData):Observable<Comentario>{
    return this.http.post<Comentario>(`${this.api}/comentarioImagen`,fd);
  }
  actualizarComentarioImg(comentario:Comentario):Observable<Comentario>{
    return this.http.put<Comentario>(`${this.api}/update_comentario_imagen/${comentario.id}`,comentario);
  }
  eliminarComentarioImg(comentario:Comentario):Observable<Comentario>{
    return this.http.delete<Comentario>(`${this.api}/delete_comentario_img/${comentario.id}`);
  }

  //COMENTARIO IMAGEN///

  ////RESPUESTAS TO COMENTARIO
  respuestaComentario(comentario:Comentario):Observable<Comentario>{
    return this.http.post<Comentario>(`${this.api}/response_comentario`,comentario);
  }
  updateRespuesta(respuesta:Comentario):Observable<Comentario>{
    return this.http.put<Comentario>(`${this.api}/update_respuesta/${respuesta.id}`,respuesta);
  }
  eliminarRespuesta(respuesta:Comentario):Observable<Comentario>{
    return this.http.delete<Comentario>(`${this.api}/delete_respuesta/${respuesta.id}`);
  }


}
