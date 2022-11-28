import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicacionResolver } from 'src/app/resolvers/publicacion.resolver';
import { UsuarioauthResolver } from 'src/app/resolvers/usuarioauth.resolver';
import { PublicacionesComponent } from './publicaciones.component';

const routes: Routes = [
  {path:'',resolve:{usuario:UsuarioauthResolver,publicaciones:PublicacionResolver},component:PublicacionesComponent},
  {path:'**',redirectTo:'',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicacionesRoutingModule { }
