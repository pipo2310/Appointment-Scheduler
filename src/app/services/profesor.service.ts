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
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'homeProfesor' })
};

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  //conexión a la base de datos
  NODE_API_SERVER = "http://ec2-34-239-46-160.compute-1.amazonaws.com:3000";
  //PHP_API_SERVER = "http://ec2-18-207-248-234.compute-1.amazonaws.com";

  constructor(private httpClient: HttpClient) {
    //this.getSemanasSemestre();
  }

  /**
   * cierra la sesión del usuario.
   * @param profesor 
   */
  public conmutarLogueado(profesor: Profesor) {
    return this.httpClient.post(`${this.NODE_API_SERVER}/logeado`,
      { "cedula": profesor.cedula });
  }

  public getSemanasSemestre(): Observable<any> {
    let semanas: any[];
    return this.httpClient.get<any>(`${this.NODE_API_SERVER}/semanasSemestre`)
      .pipe(tap(res => {
        semanas = res;
      }));
  }

  public getCitasSemana(cedulaProf: string, fechaIni: string, fechaFin: string): Observable<any> {
    let citas: any[];
    return this.httpClient.post(`${this.NODE_API_SERVER}/citasUnaSemProf`, {
      cedula: cedulaProf,
      diaIni: fechaIni,
      diaFin: fechaFin
    })
      .pipe(tap(res => {
        citas = res;
      }));
  }


  public getCitaCompleta(cedulaEst: string, cedulaProf: string, fecha: string, hora: string): Observable<any> {
    let cita: any[];
    return this.httpClient.post(`${this.NODE_API_SERVER}/citasCompletasProf`, {
      cedulaEst: cedulaEst,
      fecha: fecha,
      hora: hora,
      cedulaProf: cedulaProf
    }).pipe(tap(res => {
      cita = res;

    }));
  }

  public aceptarCita(cedulaProf: string, fecha: string, hora: string) {
    return this.httpClient.post(`${this.NODE_API_SERVER}/aceptarCitaProf`, {
      dia: fecha,
      hora: hora,
      cedProf: cedulaProf
    }).pipe(tap(res => {
    }));
  }

  public cancelarCita(cedulaProf: string, fecha: string, hora: string) {
    return this.httpClient.post(`${this.NODE_API_SERVER}/rechazarCitaProf`, {
      dia: fecha,
      hora: hora,
      cedProf: cedulaProf
    }).pipe(tap(res => {
    }));
  }
}



