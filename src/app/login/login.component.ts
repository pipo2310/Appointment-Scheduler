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
import { LoginService } from '../services/login.service';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { equalParamsAndUrlSegments } from '@angular/router/src/router_state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    constructor(private loginService: LoginService, private apiService: ApiService, private router: Router) { }
  
    ngOnInit() {
    }
   
  
    logIn(username: string, password: string, event: Event) {
      let elem: HTMLElement = document.getElementById('msgSesionIniciada');
      let elem2: HTMLElement = document.getElementById('msg');
      event.preventDefault(); // Avoid default action for the submit button of the login formt
    if(username==""|| password==""){
    let elem: HTMLElement = document.getElementById('lbl');
    elem.setAttribute("style", " border: 1px solid red;");
    let elem2: HTMLElement = document.getElementById('lb');
    elem2.setAttribute("style", " border: 1px solid red;");
    }
    else
    {
      if(username!=""|| password!=""){
        //Llamada al servicio del api
        /*let cedula = this.apiService.login(username, password);
      
      if (cedula != null) {
        let usuario = this.apiService.getUsuario(cedula);
        if (cedula == '123456789') {
          this.navegarAProfesor();
        } else if (cedula == '000000000') {
          this.navegarAEstudiante();
        }
      } else {
        elem2.setAttribute("style", "color:#A20412");
        elem2.textContent="! Datos erróneos. Por favor, inténtelo otra vez."; 
        elem.textContent="";
      }*/
      //Llamada al servicio del api
      let promesa = this.loginService.login(username, password).toPromise();
   
      promesa.then(res => {
          // Obtiene el status de login que aparece en la respuesta
          let logueado = res['logueado'];
          if (logueado == 0) { // Se puede continuar con el login
           // this.loginService.conmutarLogueado(res['cedula']).subscribe();
            // Obtiene el rol que aparece en la respuesta
            this.loginService.conmutarLogueado(res['cedula']).subscribe();
            let rol = res['rol'];
            if (rol == 1) { // Profesor
              this.navegarAProfesor();
            } else { // Estudiante
              this.navegarAEstudiante();
            }
          }
          else { // No se debe continuar con el login
            elem2.textContent="";           
            elem.setAttribute("style", "color:#E50E21");         
            elem.textContent="Ya hay una sesión iniciada. Por favor, cierre la sesión e inténtelo otra vez."; 
          
          }
        },
        error => {
          elem2.setAttribute("style", "color:#A20412");
          elem2.textContent="! Datos erróneos. Por favor, inténtelo otra vez."; 
          elem.textContent=""; 

        }
      );
      }
    }
  }

  /**
   * redirige a la pantalla para profesor.
   */
  navegarAProfesor() {
    this.router.navigate(['homeProfesor']);
  }

  /**
   * redirige a la pantalla para estudiante.
   */
  navegarAEstudiante() {
    this.router.navigate(['homeEstudiante']);
  }
}
