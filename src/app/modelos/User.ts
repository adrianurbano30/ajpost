export interface User{
  id?:number
  name:string;
  lastname:string;
  username:string;
  foto_perfil:string;
  email?:string;
  password?:string;
  created_at?:Date;
  updated_at?:Date;
}
