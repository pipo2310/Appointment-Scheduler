import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../modelo/usuario';
import { Observable } from  'rxjs';
import { Profesor } from '../modelo/profesor';
import { Estudiante } from '../modelo/estudiante';
import { map, first } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  PHP_API_SERVER = "http://127.0.0.1:8080";
  constructor(private httpClient : HttpClient) { }

  public login(usuario : Usuario) : Observable<any> {
    var username = usuario.username;
    var pass = usuario.pass;
     return this.httpClient.get<any>(`${this.PHP_API_SERVER}/login.php/?username=${username}&pass=${pass}`) .pipe(map(user => {
      // login successful if there's a user in the response
      if (user) {
          // store user details and basic auth credentials in local storage 
          // to keep user logged in between page refreshes
          user = window.btoa(usuario.username + ':' + usuario.pass);
          localStorage.setItem('currentUser', JSON.stringify(user));
      }
      return user;
  }));;
  }

  public getProfesor(username : string) : Observable<Profesor> {
    return this.httpClient.get<Profesor>(`${this.PHP_API_SERVER}/login.php/?username=${username}}`).pipe(map(user => {
      // login successful if there's a user in the response
      if (user) {
          // store user details and basic auth credentials in local storage 
          // to keep user logged in between page refreshes
         // user.authdata = window.btoa(usuario.username + ':' + usuario.pass);
          localStorage.setItem('currentUser', JSON.stringify(user));
      }

      return user;
  }));;;
  }

  public getEstudiante(username : string) : Observable<Estudiante> {
    return this.httpClient.get<Estudiante>(`${this.PHP_API_SERVER}/login.php/?username=${username}`).pipe(map(user => {
      // login successful if there's a user in the response
      if (user) {
        
          // store user details and basic auth credentials in local storage 
          // to keep user logged in between page refreshes
        //user= window.btoa(user);
       
          localStorage.setItem('currentUser', JSON.stringify(user));
      }

      return user;
  }));;;
  }
}
