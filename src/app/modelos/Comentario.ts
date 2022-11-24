import { Like } from "./Like";
import { User } from "./User";

export interface Comentario{
  id?:number;
  comentarios:string;
  User?:User;
  Likes?:Like[];
  editado?:Boolean;
  comentarioable_id?:number;
  comentarioable_type?:string;
  parent_id?:number;
  Respuestas?:Comentario[];
  created_at?:Date;
  updated_at?:Date;
}
