import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { ValidateLoginGuard } from './guards/validate-login.service';
import { NuevoComponent } from './components/eventos/nuevo/nuevo.component';
import { RedirigirComponent } from './components/eventos/redirigir/redirigir.component';
import { EditarComponent } from './components/eventos/editar/editar.component';
import { EditareComponent } from './components/entidades/editare/editare.component';
import { NuevoeComponent } from './components/entidades/nuevoe/nuevoe.component';
import { EntidadesComponent } from './components/entidades/entidades.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'inicio',
    component: InicioComponent,
  },
  {
    path: 'eventos',
    component: EventosComponent,
    canActivate: [ValidateLoginGuard]
  },
  {
    path: 'eventos/nuevo',
    component: NuevoComponent,
    canActivate: [ValidateLoginGuard]
  },
  {
    path: 'eventos/editar/:id',
    component: EditarComponent,
    canActivate: [ValidateLoginGuard]
  },
  {
    path: 'eventos/:id',
    component: RedirigirComponent
  },
  {
    path: 'entidades',
    component: EntidadesComponent,
    canActivate: [ValidateLoginGuard]
  },
  {
    path: 'entidades/nuevo',
    component: NuevoeComponent,
    canActivate: [ValidateLoginGuard]
  },
  {
    path: 'entidades/editar/:id',
    component: EditareComponent,
    canActivate: [ValidateLoginGuard]
  },
  {
    path: '**',
    redirectTo: 'inicio'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
