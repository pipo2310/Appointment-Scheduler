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
import { Observable } from  'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CalendarioProfesorService {

  //NODE_API_SERVER = "http://localhost:3000";
  NODE_API_SERVER = "http://ec2-34-239-46-160.compute-1.amazonaws.com:3000";
  constructor(private httpClient : HttpClient) { }

  public getCitasDia(cedulaProf: string, fecha: string ): Observable<any> {
    let citas: any[];
    
    return this.httpClient.post(`${this.NODE_API_SERVER}/citasUnaSemProf`, {
      cedula: cedulaProf,
      diaIni: fecha,
      diaFin: fecha
    })

    .pipe( tap (res => {

        citas = res;
        console.log(citas);
    }));
    
  }

  getDiasConCita(diaIni: string, diaFin: string, cedProf: string) {
    let diasConCita: Object[];
    return this.httpClient.post<any>(`${this.NODE_API_SERVER}/diasConCitasProf`, {
      diaIni: diaIni,
      diaFin: diaFin,
      cedProf: cedProf,
    }).pipe(tap(res => {
      diasConCita = res;
    }));
  }

}
