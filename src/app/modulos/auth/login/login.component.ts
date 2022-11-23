import { Component } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCheck,faEnvelope,faXmarkCircle,faLock,faAnchorLock } from '@fortawesome/free-solid-svg-icons';

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

  constructor(private fb:FormBuilder,private router:Router)
  {
    this.LoginForm = this.formInit();
  }


  formInit():FormGroup{
    return this.fb.group({
        email:new FormControl(null,{
        validators:[Validators.required,Validators.email]
      }),
      password:['password',[Validators.required]]
    });
  }

  login(){

  }

}
