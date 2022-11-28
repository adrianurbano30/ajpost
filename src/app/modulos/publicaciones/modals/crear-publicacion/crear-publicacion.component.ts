import { Component,Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faBowlFood, faCarOn, faDog, faFaceSmile, faMobileRetro, faPersonSwimming, faWheelchairMove, faXmark } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/modelos/User';

@Component({
  selector: 'app-crear-publicacion',
  templateUrl: './crear-publicacion.component.html',
  styleUrls: ['./crear-publicacion.component.scss']
})
export class CrearPublicacionComponent {

  usuario!:User;
  iconocerrar=faXmark;
  iconoEmojis=faFaceSmile;
  iconoanimales=faDog;
  iconoComida=faBowlFood;
  iconoDeportes=faPersonSwimming;
  iconoViajesLugares=faCarOn;
  iconoObjetos=faMobileRetro;
  iconoSimbolos=faWheelchairMove;
  publicacionForm!:FormGroup;
  archivos:any[]=[];
  imageSrc:string[]=[];

  constructor(public dialogRef:MatDialogRef<CrearPublicacionComponent>,
    @Inject(MAT_DIALOG_DATA)public usuario_data:User,
    private fb:FormBuilder
    )
  {
    this.usuario=this.usuario_data;
    this.publicacionForm = this.forminit();
  }

  forminit():FormGroup{
    return this.fb.group({
      body:['',[]],
      imagenes:[null],
      //fileSource: new FormControl('', [])
    });
  }

  cantImagenes(array:any[]):Number{
    return array.length;
  }
  quitarImagenestemp(indice:number){
    this.archivos.splice(indice,1);
    this.imageSrc.splice(indice,1);
  }

  capturarFile(event:any){

    for (let index = 0; index < event.target.files.length; index++) {
      if (event.target.files[index].type=='image/jpeg' || event.target.files[index].type=='image/png' || event.target.files[index].type=='image/bmp' || event.target.files[index].type=='image/tiff') {
        const reader = new FileReader();
        this.archivos.push(event.target.files[index]);
        reader.readAsDataURL(event.target.files[index])
        reader.onload = () => {
          //this.imageSrc[index] = reader.result as string;
          this.imageSrc.push(reader.result as string);
        // this.publicacionForm.patchValue({
        //   fileSource: reader.result
        // });
        };
      }
    }
  }

  cerrarModal(): void {
    this.dialogRef.close();
  }

}
