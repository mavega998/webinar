import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { ApiService } from './services/api.service';

import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { NuevoComponent } from './components/eventos/nuevo/nuevo.component';
import { RedirigirComponent } from './components/eventos/redirigir/redirigir.component';
import { EditarComponent } from './components/eventos/editar/editar.component';
import { EntidadesComponent } from './components/entidades/entidades.component';
import { NuevoeComponent } from './components/entidades/nuevoe/nuevoe.component';
import { EditareComponent } from './components/entidades/editare/editare.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    EventosComponent,
    NavbarComponent,
    FooterComponent,
    NuevoComponent,
    RedirigirComponent,
    EditarComponent,
    EntidadesComponent,
    NuevoeComponent,
    EditareComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    DatePipe,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
