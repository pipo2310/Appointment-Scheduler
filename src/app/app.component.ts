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

import { Component, HostListener } from '@angular/core';
import { EstudianteService } from '../app/services/estudiante.service';
import { ProfesorService } from '../app/services/profesor.service';
import { Estudiante } from '../app/modelo/estudiante'
import { Router } from '@angular/router';
import { Profesor } from './modelo/profesor';
import { Usuario } from './modelo/usuario';
import { LoginService } from '../app/services/login.service';
import { isThisSecond } from 'date-fns';
import { parse } from 'querystring';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  usuarioActualEst: Estudiante;
  usuarioActualProf: Profesor;
  usuarioActual: Usuario;
  estaLogueado: boolean;

  constructor(private studentService: EstudianteService, private profesorService: ProfesorService, private router: Router) {
      this.estaLogueado = true;
      this.usuarioActual
  }
  title = 'U-Meeter';


  getUsuarioActual() {
    let parsed = JSON.parse(localStorage.getItem('usuarioActual'));
    if (parsed) {
      this.usuarioActual = {
        cedula: parsed['cedula'],
        email: parsed['email'],
        nombre: parsed['nombre'],
        primerApellido: parsed['primerApellido'],
        segundoApellido: parsed['segundoApellido']
      }
    }
    this.estaLogueado = true;
    return this.usuarioActual;

  }
  // getUser(){
  //  return localStorage.getItem('usuarioActual');
  //}

  logout() {

    let parsed = JSON.parse(localStorage.getItem('usuarioActual'));
      if (parsed) {
        this.usuarioActualProf = {
          cedula: parsed['cedula'],
          email: parsed['email'],
          nombre: parsed['nombre'],
          primerApellido: parsed['primerApellido'],
          segundoApellido: parsed['segundoApellido']
        }
        this.profesorService.conmutarLogueado(this.usuarioActualProf).subscribe();
        //this.estaLogueado = false;
        localStorage.removeItem('usuarioActual');
        localStorage.clear()
        this.router.navigate(['login']);   
        localStorage.clear();     
      }
      
      
  }


}

