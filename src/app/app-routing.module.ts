import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { EstudianteComponent } from './estudiante/estudiante.component';
import{ProfesorComponent} from './profesor/profesor/profesor.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'homeEstudiante', component: EstudianteComponent },
  { path: 'homeProfesor', component: ProfesorComponent },
  { path: '#homeEstudiante', component: EstudianteComponent},

  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
