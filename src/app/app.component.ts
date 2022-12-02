import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AjPost';
  constructor(private router:Router)
  {}
  ngOnInit(): void {



  }

  isruta():Boolean{
    let bandera:Boolean = false;
    if (this.router.url=='/auth/login' || this.router.url=='/auth/registro') {
        bandera=false;
        return bandera;
    }else{
        // if (this.cookiesvc.get('token')) {

        //   this.authsvc.usuarioLogueado$.subscribe(user=>{
        //     this.UsuarioLogueado = user;
        //   });

        // }
      bandera=true;
      return bandera
    }
  }

}
