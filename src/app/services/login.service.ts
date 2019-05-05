import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from  'rxjs';
import { tap } from  'rxjs/operators';
import { Usuario } from '../modelo/usuario';
import { Profesor } from '../modelo/profesor';
import { Estudiante } from '../modelo/estudiante';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'login' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  PHP_API_SERVER = "http://127.0.0.1:8080";
  constructor(private httpClient : HttpClient) { }

  public login(username : string, password : string) {
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}/login.php`, {
      user: username,
      pass: password
    }, httpOptions)
    .pipe(tap(res => {
      let rol = res['rol'];
      var user: Usuario;
      if (rol == 1) {
        let profesor: Profesor = {
          cedula : res['cedula'],
          email : res['email'],
          nombre : res['nombre'],
          primerApellido : res['primerApellido'],
          segundoApellido : res['segundoApellido']
       };
       user = profesor;
      }
      else {
        let estudiante: Estudiante = {
          cedula : res['cedula'],
          email : res['email'],
          nombre : res['nombre'],
          primerApellido : res['primerApellido'],
          segundoApellido : res['segundoApellido'],
          carne : res['carne']
        };
        user = estudiante;
      }
      console.log(user);
      localStorage.setItem('usuarioActual', JSON.stringify(user));
      return res;
    }));
  }
}
