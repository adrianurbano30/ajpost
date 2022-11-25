import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable,catchError,throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../servicios/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private cookiesvc:CookieService,private authsvc:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = this.cookiesvc.get('token');
    let req = request;
    if (token) {

      req = request.clone({
        setHeaders:{
          authorization:`Bearer${token}`
        }
      });

    }
    return next.handle(req).pipe(catchError((err)=>this.manejarError(err)));
  }

  manejarError(err:HttpErrorResponse){
    this.authsvc.errorServer(err);
    return throwError(()=>err.error['error'])
  }

}
