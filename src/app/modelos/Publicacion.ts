import { Comentario } from './Comentario';
import { Like } from './Like';
import { Imagenes } from './Imagenes';
import { User } from './User';
export interface Publicacion{
  id?:number,
  body:string;
  Imagenes?:Imagenes[];
  Likes?:Like[];
  Comentarios?:Comentario[];
  user:User;
  created_at:Date;
  updated_at:Date;
}
