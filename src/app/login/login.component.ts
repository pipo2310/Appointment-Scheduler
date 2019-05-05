import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Profesor } from '../modelo/profesor';
import { Estudiante } from '../modelo/estudiante';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    constructor(private loginService: LoginService) { }
  
    ngOnInit() {
    }
  
    logIn(username: string, password: string, event: Event) {
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

      // Llamada al servicio del api
      this.loginService.login(username, password).subscribe(
        res => {
          console.log(res);
          let rol = res['rol'];
          if (rol == 1) { // Profesor
           console.log("Ruta a profesor!");
          } else { // Estudiante
            console.log("Ruta a estudiante!");
          }
        },
        error => {
          window.alert("Login inválido.");
          console.error(error);
        },
        // navegación
      );
      }
    }
  }
}
