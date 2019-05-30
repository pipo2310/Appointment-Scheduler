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

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'U-Meeter';
  userCed : string;

  constructor(private loginService: LoginService, private router: Router) {
   }
  
 // getUser(){
  //  return localStorage.getItem('usuarioActual');
  //}

  logout() {
    // Extrae la información del usuario guardada en el almacenamiento local por el login service
    let parsed = JSON.parse(localStorage.getItem('usuarioActual'));
    this.userCed = parsed['cedula'];
    this.loginService.conmutarLogueado(this.userCed).subscribe();
    this.router.navigate(['login']);
  }
    
 
  }

