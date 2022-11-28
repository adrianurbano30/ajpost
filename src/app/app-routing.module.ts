import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { IsAuthGuard } from './guards/is-auth.guard';


const routes: Routes = [
  {path:'',redirectTo:'auth/login',pathMatch:'full'},
  {path:'auth',canActivate:[IsAuthGuard],canActivateChild:[IsAuthGuard],loadChildren:()=>import('./modulos/auth/auth.module').then(m=>m.AuthModule)},
  {path:'publicaciones',canActivate:[AuthGuard],canActivateChild:[AuthGuard],loadChildren:()=>import('./modulos/publicaciones/publicaciones.module').then(m=>m.PublicacionesModule)},
  {path:'perfil',canActivate:[AuthGuard],canActivateChild:[AuthGuard],loadChildren:()=>import('./modulos/perfil/perfil.module').then(m=>m.PerfilModule)},
  {path:'**',redirectTo:'auth/login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
