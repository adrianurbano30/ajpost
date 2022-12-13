import { Component,Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faBowlFood, faCarOn, faDog, faFaceSmile, faMobileRetro, faPersonSwimming, faWheelchairMove, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Comentario } from 'src/app/modelos/Comentario';
import { Imagenes } from 'src/app/modelos/Imagenes';
import { Publicacion } from 'src/app/modelos/Publicacion';
import { User } from 'src/app/modelos/User';

@Component({
  selector: 'app-actualizar-publicacion',
  templateUrl: './actualizar-publicacion.component.html',
  styleUrls: ['./actualizar-publicacion.component.scss']
})
export class ActualizarPublicacionComponent {

  usuarioLogueado!:User;
  publicacion!:Publicacion;
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
  imageSrc2delete:Imagenes[]=[];
  imageSrc2:Imagenes[]=[];

  constructor(
    public dialogRef:MatDialogRef<ActualizarPublicacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private fb:FormBuilder
  )
  {
    this.usuarioLogueado = this.data.usuario;
    this.publicacion = this.data.publicacion;
    this.publicacionForm = this.forminit();
    this.publicacionForm.patchValue({
      body:this.publicacion.body
    })
    if (this.publicacion.Imagenes) {
      let img:Imagenes;

      let cmt:Comentario[]=[];

      this.publicacion.Imagenes.forEach((element:Imagenes) => {
        img={
          id:element.id,
          url:'http://localhost/laravel/jwt_backend/public/'+element.url,
          Comentarios:cmt
        }
        //this.imageSrc.push('http://jwt_backend.test/'+element.url);
        this.imageSrc2.push(img);
        //console.log('->',this.imageSrc2);

      });
    }
  }

  capturarFile(event:any){
    let img:Imagenes;
    for (let index = 0; index < event.target.files.length; index++) {
      if (event.target.files[index].type=='image/jpeg' || event.target.files[index].type=='image/png' || event.target.files[index].type=='image/bmp' || event.target.files[index].type=='image/tiff') {
        const reader = new FileReader();

        this.archivos.push(event.target.files[index]);//<-ESTE GUARDA LOS ARCHIVOS TEMPORALES Y SE ENVIA AL SVC

        reader.readAsDataURL(event.target.files[index])
        reader.onload = () => {
          //this.imageSrc.push(reader.result as string);
          let comentarios:Comentario[]=[];
          img={
            id:NaN,
            url:reader.result as string,
            Comentarios:comentarios,
          }
          this.imageSrc2.push(img);
        };
      }
    }
  }

  forminit():FormGroup{
    return this.fb.group({
      body:['',[]],
      imagenes:[null],
      //fileSource: new FormControl('', [])
    });
  }

  quitarImagenestemp(indice:number){

    if (this.imageSrc2[indice].id) {
      let img:Imagenes = this.imageSrc2[indice];
      this.imageSrc2delete.push(img);
    }
    this.archivos.splice(indice,1);
    this.imageSrc2.splice(indice,1);
    //console.log('las que vamos a eliminar de la bd->',this.imageSrc2delete);
  }

  cantImagenes(array:any[]):Number{
    return array.length;
  }

  cerrarModal(): void {
    this.dialogRef.close();
  }

}
