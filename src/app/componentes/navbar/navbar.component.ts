import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private router:Router,private authsvc:AuthService)
  {}

  isruta():Boolean{
    let bandera:Boolean = false;
    if (this.router.url=='/auth/login' || this.router.url=='/auth/registro') {
        bandera=false;
        return bandera;
    }else{
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
