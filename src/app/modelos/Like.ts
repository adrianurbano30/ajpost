import { User } from "./User";

export interface Like{
  id?:number;
  User?:User;
  likeable_id:number;
  likeable_type:string;
  created_at:Date;
  updated_at:Date;
}
