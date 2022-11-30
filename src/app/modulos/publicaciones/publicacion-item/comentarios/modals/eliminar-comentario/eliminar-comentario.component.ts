import { Component,Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-eliminar-comentario',
  templateUrl: './eliminar-comentario.component.html',
  styleUrls: ['./eliminar-comentario.component.scss']
})
export class EliminarComentarioComponent {


  iconocerrar=faXmark;

  constructor(public dialogRef:MatDialogRef<EliminarComentarioComponent>)
  {}

  cerrarModal(){
    this.dialogRef.close();
  }

}
