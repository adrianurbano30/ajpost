import { Component } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCheck,faEnvelope,faXmarkCircle,faLock,faAnchorLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{

  iconcheck = faCheck;
  iconxmark = faXmarkCircle;
  iconemail = faEnvelope;
  iconpassword = faLock;
  iconoejemplo = faAnchorLock;
  existeError:boolean=false;
  errorMensaje!:string;
  LoginForm!:FormGroup;

  constructor(private fb:FormBuilder,private router:Router,private authsvc:AuthService)
  {

    this.authsvc.hayerrores$.subscribe((err:boolean)=>{
      this.existeError = err;
    });
    this.authsvc.msjerror$.subscribe((msj:any)=>{
      if (msj.status===400) {
        this.errorMensaje = msj.error['error'];
      }else{
        this.errorMensaje = msj.error['error'];
      }
    });
    this.LoginForm = this.formInit();
  }


  formInit():FormGroup{
    return this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['11111111',[Validators.required]]
    });
  }

  login(){
    this.authsvc.inicioSesion(this.LoginForm.value).subscribe((respuesta:any)=>{
      if (respuesta) {
          this.router.navigate(['publicaciones']);
      }
    });
  }

}
