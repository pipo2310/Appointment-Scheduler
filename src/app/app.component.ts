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
import {EstudianteService}  from '../app/services/estudiante.service';
import {ProfesorService}  from '../app/services/profesor.service';
import {Estudiante} from '../app/modelo/estudiante'
import { Router } from '@angular/router';
import { Profesor } from './modelo/profesor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  usuarioActualEst:Estudiante;
  usuarioActualProf:Profesor;

  constructor(private studentService: EstudianteService,private profesorService:ProfesorService,private router: Router){
    try {
      this.beforeUnloadHander(event);
      this.unloadHandler(event);
    } catch(Exception){}
    

  }

@HostListener('window:unload', [ '$event' ])
  unloadHandler(event) {
    let parsed = JSON.parse(localStorage.getItem('usuarioActual'));
    if(localStorage.getItem('usuarioActual').search('carne') > 0){
      if(parsed){
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
    if(parsed){
      this.usuarioActualProf = {
        cedula : parsed['cedula'],
        email : parsed['email'],
        nombre : parsed['nombre'],
        primerApellido : parsed['primerApellido'],
        segundoApellido : parsed['segundoApellido']
    }
    //console.log(this.usuarioActualProf)
    this.profesorService.conmutarLogueado(this.usuarioActualProf).subscribe();
    localStorage.removeItem('usuarioActual');
    this.router.navigate(['login']);
    }
  }
}

  @HostListener('window:beforeunload', [ '$event' ])
  beforeUnloadHander(event) {
    let parsed = JSON.parse(localStorage.getItem('usuarioActual'));
    if(localStorage.getItem('usuarioActual').search('carne') > 0){
      if(parsed){
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
    if(parsed){
      this.usuarioActualProf = {
        cedula : parsed['cedula'],
        email : parsed['email'],
        nombre : parsed['nombre'],
        primerApellido : parsed['primerApellido'],
        segundoApellido : parsed['segundoApellido']
    }
    //console.log(this.usuarioActualProf)
    this.profesorService.conmutarLogueado(this.usuarioActualProf).subscribe();
    localStorage.removeItem('usuarioActual');
    this.router.navigate(['login']);
    }
  }
}
  title = 'U-Meeter';
  userCed : string;

 
  
 // getUser(){
  //  return localStorage.getItem('usuarioActual');
  //}

  logout() {

    // Extrae la información del usuario guardada en el almacenamiento local por el login service
    //let parsed = JSON.parse(localStorage.getItem('usuarioActual'));
    //this.userCed = parsed['cedula'];
    //this.loginService.conmutarLogueado(this.userCed).subscribe();
    //this.router.navigate(['login']);
  }
    
 
  }

