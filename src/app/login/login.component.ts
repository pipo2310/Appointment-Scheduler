import { Component, OnInit } from '@angular/core';
import { Usuario } from '../modelo/usuario';
import { LoginService } from '../services/login.service';
import { map, first } from 'rxjs/operators';
import {Router} from '@angular/router';
import { ROUTER_PROVIDERS } from '@angular/router/src/router_module';
import{RouterModule} from '@angular/router';
import { DefaultRouteReuseStrategy } from '@angular/router/src/route_reuse_strategy';

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

      // Calls service to login user to the api rest
      this.loginService.login(username, password).subscribe(
        res => {
          console.log(res);
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
