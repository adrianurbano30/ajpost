import { Component } from '@angular/core';
import { faCheckDouble,faLock,faEnvelope,faUser,faXmark,faCheck,faSignature } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private fb:FormBuilder,private router:Router)
  {}



  registrate(){

  }

}
