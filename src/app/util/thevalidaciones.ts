import { AbstractControl, FormGroup } from "@angular/forms";
import { map } from "rxjs";
import { AuthService } from "../servicios/auth.service";

export class Thevalidaciones{


  static validateUsernameUso(auth:AuthService){
    return (control:AbstractControl)=>{
      const valorCampo = control.value;
      return auth.usernameExiste(valorCampo).pipe(
        map(respuesta=>{
          //console.log(respuesta.mensaje);
          return respuesta.mensaje=='FALSE'? null :{EnUso:true}
        })
      )
    }
  }

  static validateEmailUso(auth:AuthService){
    return (control:AbstractControl)=>{
      const valorCampo = control.value;
      return auth.emailExiste(valorCampo).pipe(
        map(respuesta=>{
            //console.log(respuesta.mensaje);
            return respuesta.mensaje=='FALSE'? null : {registrado:true}
        })
      )
    }
  }

  static passwordconfirm(passsword:any,confpassword:any){
    return (formgroup:FormGroup)=>{
      const passcontrol = formgroup.controls[passsword];
      const passconfirmcontrol= formgroup.controls[confpassword];

      if (passconfirmcontrol.errors && !passcontrol.errors?.['passwordconfirm']) {
        return;
      }
      if (passcontrol.value !== passconfirmcontrol.value) {
        passconfirmcontrol.setErrors({passwordconfirm:true})
      }else{
        passconfirmcontrol.setErrors(null);
      }

    }
  }

}
