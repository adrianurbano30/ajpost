import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/modelos/User';
import { AuthService } from 'src/app/servicios/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{


  UsuarioLogueado!:User;

  constructor(
    private router:Router,
    private authsvc:AuthService,
    private cookiesvc:CookieService)
  {}

  ngOnInit(): void {
  }

  isruta():Boolean{
    let bandera:Boolean = false;
    if (this.router.url=='/auth/login' || this.router.url=='/auth/registro') {
        bandera=false;
        return bandera;
    }else{
        if (this.cookiesvc.get('token')) {

          this.authsvc.usuarioLogueado$.subscribe(user=>{
            this.UsuarioLogueado = user;
          });

        }
      bandera=true;
      return bandera
    }
  }
  cerrarSesion(){
    this.authsvc.cerrarSesion().subscribe(res=>{
      this.router.navigate(['auth/login']);
    });
  }
}
