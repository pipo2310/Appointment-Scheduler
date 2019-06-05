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
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Estudiante } from '../modelo/estudiante';
import { Curso } from '../modelo/curso';
import { Observable } from  'rxjs';
import { tap } from  'rxjs/operators';
import { Profesor } from '../modelo/profesor';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'homeStudent' })
};

@Injectable({
  providedIn: 'root'
})


export class CalendarService {
  //conexión a la base de datos
  //PHP_API_SERVER = "http://ec2-18-207-248-234.compute-1.amazonaws.com";
  NODE_API_SERVER = "http://localhost:3000";

  constructor(private httpClient : HttpClient) { }

  /**
   * devuelve la lista de cursos en los que está matriculado el estudiante.
   * @param estudiante 
   */
  getHorarioDispProfe(cedula:string, fechaInicio:string, fechaFinal:string): Observable<any>{
    let fechas;
    return this.httpClient.post<any>(`${this.NODE_API_SERVER}/dispHoraProf`,{
    cedula: cedula,
    diaIni: fechaInicio,
    diaFin: fechaFinal})
      .pipe(tap(res => {
        fechas =  res;
        console.log("fechas:", fechas);
      }));
  }
}