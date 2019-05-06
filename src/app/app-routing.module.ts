import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
//import { HomeEstudiantePruebaComponent } from './estudiante/home-estudiante-prueba/home-estudiante-prueba.component';
import { HomeProfesorPruebaComponent } from './profesor/home-profesor-prueba/home-profesor-prueba.component';
import { EstudianteComponent } from './estudiante/estudiante.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'homeEstudiante', component: EstudianteComponent },
  { path: 'homeProfesor', component: HomeProfesorPruebaComponent },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
