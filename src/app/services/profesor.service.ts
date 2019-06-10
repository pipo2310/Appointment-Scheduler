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
import { Profesor } from '../modelo/profesor';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'homeProfesor' })
};

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  //conexión a la base de datos
  NODE_API_SERVER = "http://localhost:3000";
  //PHP_API_SERVER = "http://ec2-18-207-248-234.compute-1.amazonaws.com";
  
  constructor(private httpClient : HttpClient) { 
    //this.getSemanasSemestre();
  }

  /**
   * cierra la sesión del usuario.
   * @param profesor 
   */
  public conmutarLogueado(profesor: Profesor) {
    return this.httpClient.post(`${this.NODE_API_SERVER}/logeado`,
    {"cedula": profesor.cedula});
  }

  public getSemanasSemestre(){
    return this.httpClient.get(`${this.NODE_API_SERVER}/semanasSemestre`);
  }
}
