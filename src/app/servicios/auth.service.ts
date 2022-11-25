import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { User } from '../modelos/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api:string='http://localhost/laravel/JWT_backend/public/api';
  usuario!:User;
  public usuarioLogueado = new BehaviorSubject<User>(this.usuario);
  public hayerrores$ = new Subject<boolean>();
  public msjerror$ = new Subject<string>();
  public hayerrores  = new BehaviorSubject<boolean>(false);
  public msjerror = new BehaviorSubject<string>('');

  constructor(private http:HttpClient,private cookiesvc:CookieService) { }

  inicioSesion(usuario:User):Observable<any>{
    return this.http.post<any>(`${this.api}/login`,usuario)
    .pipe(
      tap(
        (respuesta:any)=>{
          let usuario:User = respuesta.usuario;
          this.usuarioLogueado.next(usuario);
          this.cookiesvc.set('token',respuesta.token);
        }
      )
    )
  }

  registro(usuario:User):Observable<any>{
    return this.http.post<User>(`${this.api}/register`,usuario)
    .pipe(
      tap(
        (respuesta:any)=>{
          if (respuesta) {
            this.cookiesvc.set('token',respuesta.token);
            let usuario:User = respuesta.usuario;
            this.usuarioLogueado.next(usuario);
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

  cerrarSesion():Observable<any>{
    let token:string = this.cookiesvc.get('token');
    return this.http.post<any>(`${this.api}/logout`,token)
    .pipe(
      tap(
        (respuesta)=>{
          console.log('respuesta server->',respuesta);
          this.usuarioLogueado.next(this.usuario);
          this.cookiesvc.deleteAll();
        }
      )
    )
  }

  errorServer(error:any){
    this.hayerrores$.next(true);
    this.msjerror$.next(error);

    setTimeout(() => {
      this.hayerrores$.next(false)
    }, 7000);
  }

}
