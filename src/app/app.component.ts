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
    this.usuarioActual;
    //this.beforeUnloadHander(event);
    //this.unloadHandler(event);

  }
  /*
    @HostListener('window:unload', ['$event'])
    unloadHandler(event) {
      let parsed = JSON.parse(localStorage.getItem('usuarioActual'));
      if (localStorage.getItem('usuarioActual').search('carne') > 0) {
        if (parsed) {
          this.usuarioActualEst = {
            cedula: parsed['cedula'],
            email: parsed['email'],
            nombre: parsed['nombre'],
            primerApellido: parsed['primerApellido'],
            segundoApellido: parsed['segundoApellido'],
            carne: parsed['carne']
          }
          //console.log(this.usuarioActualEst)
          this.studentService.conmutarLogueado(this.usuarioActualEst).subscribe();
          localStorage.removeItem('usuarioActual');
          this.router.navigate(['login']);
        }
      } else {
        if (parsed) {
          this.usuarioActualProf = {
            cedula: parsed['cedula'],
            email: parsed['email'],
            nombre: parsed['nombre'],
            primerApellido: parsed['primerApellido'],
            segundoApellido: parsed['segundoApellido']
          }
          //console.log(this.usuarioActualProf)
          this.profesorService.conmutarLogueado(this.usuarioActualProf).subscribe();
          localStorage.removeItem('usuarioActual');
          this.router.navigate(['login']);
        }
      }
    }
  
    @HostListener('window:beforeunload', ['$event'])
    beforeUnloadHander(event) {
      let parsed = JSON.parse(localStorage.getItem('usuarioActual'));
      if (localStorage.getItem('usuarioActual').search('carne') > 0) {
        if (parsed) {
          this.usuarioActualEst = {
            cedula: parsed['cedula'],
            email: parsed['email'],
            nombre: parsed['nombre'],
            primerApellido: parsed['primerApellido'],
            segundoApellido: parsed['segundoApellido'],
            carne: parsed['carne']
          }
          //console.log(this.usuarioActualEst)
          this.studentService.conmutarLogueado(this.usuarioActualEst).subscribe();
          localStorage.removeItem('usuarioActual');
          this.router.navigate(['login']);
        }
      } else {
        if (parsed) {
          this.usuarioActualProf = {
            cedula: parsed['cedula'],
            email: parsed['email'],
            nombre: parsed['nombre'],
            primerApellido: parsed['primerApellido'],
            segundoApellido: parsed['segundoApellido']
          }
          //console.log(this.usuarioActualProf)
          this.profesorService.conmutarLogueado(this.usuarioActualProf).subscribe();
          localStorage.removeItem('usuarioActual');
          this.router.navigate(['login']);
        }
      }
    }
    */
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
      this.usuarioActual.nombre = '';
      this.usuarioActual.primerApellido = '';
      this.usuarioActual.segundoApellido = '';
      localStorage.setItem('usuarioActual', JSON.stringify(this.usuarioActual));
      localStorage.removeItem('usuarioActual');
      this.router.navigate(['login']);

    }

  }


}

