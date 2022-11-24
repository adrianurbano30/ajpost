import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';
import { User } from '../modelos/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api:string='http://localhost/laravel/JWT_backend/public/api'

  constructor(private http:HttpClient,private cookiesvc:CookieService) { }

  registro(usuario:User):Observable<any>{
    return this.http.post<User>(`${this.api}/register`,usuario)
    .pipe(
      tap(
        (respuesta:any)=>{
          if (respuesta.token) {
            this.cookiesvc.set('token',respuesta.token);
            console.log('respuesta post from server al registro->',respuesta);
          }
        }
      )
    )

  }

  emailExiste(email:string):Observable<any>{
    return this.http.get<any>(`${this.api}/email_confirm/${email}`);
  }

  usernameExiste(username:string):Observable<any>{
    return this.http.get<any>(`${this.api}/username_confirm/${username}`);
  }

}
