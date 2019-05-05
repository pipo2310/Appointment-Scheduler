import { Component, OnInit } from '@angular/core';
import { Usuario } from '../modelo/usuario';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  usuario:Usuario=new Usuario;
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
     this.loginService.login(this.usuario).subscribe((res)=>{
      if(res){
        window.alert("Login valido");
          this.resultado=true;

      }else{
        this.resultado=false;
        window.alert("Login invalido");

      }

     }

     );
    }

  }
 
  
    }
  
   
  }
