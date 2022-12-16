import { Injectable } from '@angular/core';
import { Publicacion } from '../modelos/Publicacion';
import { User } from '../modelos/User';

@Injectable({
  providedIn: 'root'
})
export class PostPhotoDataService {

  publicacion!:Publicacion;
  UsuarioLogged!:User;

  constructor() { }
}
