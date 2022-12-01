import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsAuthGuard implements CanActivate, CanActivateChild {
  constructor(private cookiesvc:CookieService,private route:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = this.cookiesvc.get('token');

    if (token=='') {
        return true
    }else{

      return false;
      this.route.navigate(['publicaciones']);
    }

  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = this.cookiesvc.get('token');

    if (token=='') {
      return true
  }else{

    this.route.navigate(['publicaciones']);
    return false;

  }
  }

}
