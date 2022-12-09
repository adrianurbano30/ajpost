import { Comentario } from "./Comentario";

export interface Imagenes{
  id?:number;
  url: string;
  Comentarios?:Comentario[];
}
