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

import { Component, OnInit } from '@angular/core';
import { Profesor } from 'src/app/modelo/profesor';
import { ProfesorService } from 'src/app/services/profesor.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css']
})
export class ProfesorComponent implements OnInit {
    usuarioActual: Profesor;
  
    constructor(private profesorService: ProfesorService,private router: Router) {
      // Extrae la información del usuario guardada en el almacenamiento local por el login service
      let parsed = JSON.parse(localStorage.getItem('usuarioActual'));
      // Interpreta al usuario como un profesor
      this.usuarioActual = {
        cedula : parsed['cedula'],
        email : parsed['email'],
        nombre : parsed['nombre'],
        primerApellido : parsed['primerApellido'],
        segundoApellido : parsed['segundoApellido']
      };
    }

  
    ngOnInit() {
      
    }

    /**
     * cierra la sesión del usuario.
     */
    logout() {
      this.profesorService.conmutarLogueado(this.usuarioActual).subscribe();
     this.router.navigate(['login']);
    }
    
    vistaCalend(){
      console.log('vista calendario')
    }

    vistaList() {
      console.log('vista lista')
    }
  
    vistaList(){
      this.router.navigate(['vistaLista'])
    }
  }

