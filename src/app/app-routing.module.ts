import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',redirectTo:'publicaciones',pathMatch:'full'},
  {path:'auth',loadChildren:()=>import('./modulos/auth/auth.module').then(m=>m.AuthModule)},
  {path:'publicaciones',loadChildren:()=>import('./modulos/publicaciones/publicaciones.module').then(m=>m.PublicacionesModule)},
  {path:'perfil',loadChildren:()=>import('./modulos/perfil/perfil.module').then(m=>m.PerfilModule)},
  {path:'**',redirectTo:'publicaciones',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
