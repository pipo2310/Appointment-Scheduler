/**
 * Creado por:
 * Acuña Díaz Jimmy
 * Badilla Mora Dilian
 * Hernández Benavides Katherine
 * Morataya Sandoval Keylor
 * Quirós Montero Jose Fernando
 * Rodriguez Buján Christian
 * Soto Li Jose Alberto
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import {EstudianteComponent} from './estudiante/estudiante.component'
import{ProfesorComponent} from './profesor/profesor/profesor.component';
import{NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ListaProfesorComponent } from './lista-profesor/lista-profesor.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EstudianteComponent,
    ProfesorComponent,
    ListaProfesorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
