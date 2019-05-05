import { Component, OnInit } from '@angular/core';
import { Usuario } from '../modelo/usuario';
import { LoginService } from '../services/login.service';
import { map, first } from 'rxjs/operators';
import {Router} from '@angular/router';
import { ROUTER_PROVIDERS } from '@angular/router/src/router_module';
import{RouterModule} from '@angular/router';
import { DefaultRouteReuseStrategy } from '@angular/router/src/route_reuse_strategy';

/*@Component({
  selector: 'loginForm',
  template: `
    <div (click)="redirect(my-page)">Redirect</div>
  `,
  providers: [ROUTER_PROVIDERS]
})*/
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  usuario:Usuario=new Usuario;
  usuarioRecuperado=new Usuario;
  resultado:Boolean =new Boolean;
    constructor(private loginService: LoginService) { }
  
    ngOnInit() {
    }
  
    logIn(username: string, pass: string, event: Event) {
      event.preventDefault(); // Avoid default action for the submit button of the login formt
    if(username==""|| pass==""){
    let elem: HTMLElement = document.getElementById('lbl');
    elem.setAttribute("style", " border: 1px solid red;");
    let elem2: HTMLElement = document.getElementById('lb');
    elem2.setAttribute("style", " border: 1px solid red;");
    }else{
    if(username!=""|| pass!=""){
      
      this.usuario.username=username;
      this.usuario.pass=pass;
      // Calls service to login user to the api rest
      this.loginService.login(this.usuario).pipe(first()).subscribe(users => { 
        if(users){
          window.alert("Login valido");
         //this.redirect("nombre de pagina a la que quiero ir");
          this.resultado=true;
        }else{
          this.resultado=false;
          window.alert("Login invalido");
  
        }
     } );
     
    }
    }



    }
  
  /*  redirect(pagename: string) {
      this.router.navigate(['/'+pagename]);
    }*/
  }
