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

import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { equalParamsAndUrlSegments } from '@angular/router/src/router_state';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {

  conmutarLogSub: Subscription;

    constructor(private loginService: LoginService, private apiService: ApiService, private router: Router) { }
  
    ngOnInit() {
    }

    ngOnDestroy(){
      try{
        this.conmutarLogSub.unsubscribe();
      } catch(Excepetion ){}
      
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
      let promesa = this.loginService.login(username, password).toPromise();
   
      promesa.then(res => {
          // Obtiene el status de login que aparece en la respuesta
          let logueado = res['logueado'];
          if(logueado == null){
            elem2.setAttribute("style", "color:#A20412");
            elem2.textContent="! Datos erróneos. Por favor, inténtelo otra vez."; 
            elem.textContent=""; 
          }
          else {
            if (logueado == 0) { // Se puede continuar con el login
            // Obtiene el rol que aparece en la respuesta
            this.conmutarLogSub = this.loginService.conmutarLogueado(res['cedula']).subscribe();
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
        }
      });
      }
    }
  }

    /**
   * redirige a la pantalla para profesor.
   */
  navegarAProfesor() {
    this.router.navigate(['homeProfesor']).then(()=>{

      location.reload();
    });
  
  }

  /**
   * redirige a la pantalla para estudiante.
   */
  navegarAEstudiante() {
    this.router.navigate(['homeEstudiante']).then(()=>{

      location.reload();
    });
  }
  
}