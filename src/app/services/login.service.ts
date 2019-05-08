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
  PHP_API_SERVER = "http://ec2-18-207-248-234.compute-1.amazonaws.com";
  constructor(private httpClient : HttpClient) { }

  public login(username : string, password : string) {
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}/login.php`, {
      user: username,
      pass: password
    }, httpOptions)
    .pipe(tap(res => {
      // Obtiene el rol que aparece en la respuesta
      let rol = res['rol'];

      // Crea un usuario genérico para asignarlo a Profesor o Estudiante según corresponda
      var user: Usuario;
      if (rol == 1) { // Profesor
        let profesor: Profesor = {
          cedula : res['cedula'],
          email : res['email'],
          nombre : res['nombre'],
          primerApellido : res['primerApellido'],
          segundoApellido : res['segundoApellido']
        };
       user = profesor;
      }
      else { // Estudiante
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

      // Guarda la información del usuario en el almacenamiento local
      localStorage.setItem('usuarioActual', JSON.stringify(user));

      return res;
    }));
  }
  
  /**
   * cierra la sesión del usuario identificado por su cedula.
   * @param cedula 
   */
  public conmutarLogueado(cedula: string) {
    return this.httpClient.post(`${this.PHP_API_SERVER}/logueado.php`,
    {cedula: cedula}, httpOptions);
  }
}
