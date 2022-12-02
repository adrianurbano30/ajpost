import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private cookiesvc:CookieService,private route:Router){}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const token = this.cookiesvc.get('token');


      if (token=='') {
        this.route.navigate(['auth/login']);
        return false;
        //this.route.navigate(['auth/login']);
      }else{
        return true;
      }

  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const token = this.cookiesvc.get('token');
      if (token=='') {
        this.route.navigate(['auth/login']);
        return false;
        //this.route.navigate(['auth/login']);
      }else{
        return true;
      }
  }

}
