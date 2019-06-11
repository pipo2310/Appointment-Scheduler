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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {CitaComponent} from '../app/cita/cita.component'
import { CalendarioEstudianteComponent } from './estudiante/calendario-estudiante/calendario-estudiante.component';
import { CitaComponent } from './cita/cita.component';
import { AgregarRangoComponent } from './agregar-rango/agregar-rango.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EstudianteComponent,
    ProfesorComponent,
    ListaProfesorComponent,
    CitaComponent,
    CalendarioEstudianteComponent,
    CalendarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
