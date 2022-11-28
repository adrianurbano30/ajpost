import { Component } from '@angular/core';
import { faCheckDouble,faLock,faEnvelope,faUser,faXmark,faCheck,faSignature } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Thevalidaciones } from 'src/app/util/thevalidaciones';
import { AuthService } from 'src/app/servicios/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {

  RegisterForm!:FormGroup;
  icontext = faSignature;
  iconcheck = faCheck;
  iconxmark = faXmark;
  iconuser = faUser;
  iconemail = faEnvelope;
  iconpassword = faLock;
  iconpasscheck = faCheckDouble;

  constructor(private fb:FormBuilder,private router:Router,private authsvc:AuthService,private cookiesvc:CookieService)
  {
    this.RegisterForm = this.forminit();
  }

  forminit():FormGroup{

    return this.fb.group({
      name:['',[Validators.required,Validators.maxLength(50)]],
      lastname:['',[Validators.required,Validators.maxLength(50)]],
      username:new FormControl(null,{validators:[Validators.required,Validators.maxLength(10)],asyncValidators:[Thevalidaciones.validateUsernameUso(this.authsvc)],updateOn:'blur'}),
      email:new FormControl(null,{validators:[Validators.required,Validators.email],asyncValidators:[Thevalidaciones.validateEmailUso(this.authsvc)],updateOn:'blur'}),
      password:['',[Validators.required,Validators.maxLength(15),Validators.minLength(8)]],
      password_confirmation:['',[Validators.required]]
    },
    {
      validator:Thevalidaciones.passwordconfirm('password','password_confirmation')
    }
    );
  }

  registrate(){
    this.authsvc.registro(this.RegisterForm.value).subscribe(respuesta=>{


      if (respuesta) {
         this.router.navigate(['publicaciones']);
      }
    });
  }

}
