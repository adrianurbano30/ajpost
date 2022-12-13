import { Comentario } from "./Comentario";
import { Like } from "./Like";

export interface Imagenes{
  id?:number;
  url: string;
  Comentarios:Comentario[];
  Likes?:Like[];
}
