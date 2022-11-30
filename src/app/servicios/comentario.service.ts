import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comentario } from '../modelos/Comentario';

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


}
