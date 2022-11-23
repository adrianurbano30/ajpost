import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private router:Router)
  {
    console.log('la ruta actual->',this.router.url);
  }

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
}
