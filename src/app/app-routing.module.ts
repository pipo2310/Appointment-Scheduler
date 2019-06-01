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

import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import{CalendarioEstudianteComponent}from './estudiante/calendario-estudiante/calendario-estudiante.component'
import { EstudianteComponent } from './estudiante/estudiante.component';
import{ProfesorComponent} from './profesor/profesor/profesor.component';
import {ListaProfesorComponent} from './lista-profesor/lista-profesor.component'
import { CitaComponent } from './cita/cita.component';


//lista de rutas de cada una de las "pantallas".
const routes: Routes = [
  {path:'CalendarioEst',component:CalendarioEstudianteComponent},
  { path: 'login', component: LoginComponent },
  { path: 'homeEstudiante', component: EstudianteComponent },
  { path: 'homeProfesor', component: ProfesorComponent },
  { path: 'vistaLista', component: ListaProfesorComponent},
  { path: 'detalleCita', component: CitaComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
