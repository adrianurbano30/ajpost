import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Publicacion } from 'src/app/modelos/Publicacion';
import { User } from 'src/app/modelos/User';

@Component({
  selector: 'app-eliminar-publicacion',
  templateUrl: './eliminar-publicacion.component.html',
  styleUrls: ['./eliminar-publicacion.component.scss']
})
export class EliminarPublicacionComponent {

  iconocerrar=faXmark;
  usuario_loggeado!:User;
  publicacion!:Publicacion;

  constructor(
    public dialogRef:MatDialogRef<EliminarPublicacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  )
  {
    this.usuario_loggeado = this.data.usuario;
    this.publicacion=this.data.publicacion;
  }

  cerrarModal(){
    this.dialogRef.close();
  }

}
