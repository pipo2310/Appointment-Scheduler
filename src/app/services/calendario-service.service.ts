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
import { Estudiante } from '../modelo/estudiante';
import { Curso } from '../modelo/curso';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Profesor } from '../modelo/profesor';
import { EventDiaVistaEst, DispCitaPublicaVistaEst, DispProfeVistaEst, CitaVistaEst, CitaPublicaPropiaEstVistaEst, CitaPublicaAjenaEstVistaEst, CitaPrivadaVistaEst } from 'src/app/modelo/eventdiaVistaEst';
import { Slot } from '../modelo/slot';

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

  constructor(private httpClient: HttpClient) { }

  /**
   * devuelve la lista de cursos en los que está matriculado el estudiante.
   * @param estudiante 
   */
  getHorarioDispProfe(cedula: string, fechaInicio: string, fechaFinal: string): Observable<any> {
    let fechas;
    return this.httpClient.post<any>(`${this.NODE_API_SERVER}/dispHoraProf`, {
      cedula: cedula,
      diaIni: fechaInicio,
      diaFin: fechaFinal
    }).pipe(tap(res => {
      fechas = res;
    }));
  }

  getEventosEst(cedEst: String, fecha: string, cedProf: string, sigla: string): Observable<any> {
    //console.log("service ")
    let eventos: Object[];
    return this.httpClient.post<any>(`${this.NODE_API_SERVER}/citasUnDiaEst`, {
      cedulaEst: cedEst,
      fecha: fecha,
      cedulaProf: cedProf,
      sigla: sigla
    }).pipe(tap(res => {
      //console.log("en servicio", res);
      eventos = res;
    }));
  }

  getDiasConCitaEst(diaIni: string, diaFin: string, cedProf: string, cedEst: string, sigla: string) {
    let diasConCita: Object[];
    return this.httpClient.post<any>(`${this.NODE_API_SERVER}/diasConCitaEst`, {
      diaIni: diaIni,
      diaFin: diaFin,
      cedProf: cedProf,
      cedEst: cedEst,
      siglaCursoCitas: sigla
    }).pipe(tap(res => {
      diasConCita = res;
    }));
  }

  insertarCita(cedEst: string, cedProf: string, sigla: string, fecha: string, hora: string, descripcion: string, publica: number) {
    return this.httpClient.post<any>(`${this.NODE_API_SERVER}/insertCitaBloque`, {
      cedulaEst: cedEst,
      cedulaProf: cedProf,
      curso: sigla,
      fecha: fecha,
      hora: hora,
      descrip: descripcion,
      pub: publica
    }).pipe(tap(res => {
      if (res) {
        console.log("insertada");
      }
    }));

  }

  cancelarConsultaPrivada(informacionCita: CitaPrivadaVistaEst, cedProf: string, cedEst: string) {
    return this.httpClient.post<any>(`${this.NODE_API_SERVER}/cancelarCitaPrivada`, {
      dia: informacionCita.fecha,
      hora: informacionCita.horaIni,
      cedProf: cedProf,
      cedEst: cedEst
    }).pipe(tap(res => {
      if (res) {
        console.log("cancelada");
      }
    }));
  }

  cancelarConsultaPublica(citaPublica: CitaPublicaPropiaEstVistaEst, cedProf: string, cedEst: string) {
    return this.httpClient.post<any>(`${this.NODE_API_SERVER}/noAsistirACitaPropia`, {
      dia: citaPublica.fecha,
      hora: citaPublica.horaIni,
      cedProf: cedProf,
      cedEst: cedEst
    }).pipe(tap(res => {
      if (res) {
        console.log("no asistir");
      }
    }));
  }


  asistirACitaPublica(slot: DispCitaPublicaVistaEst, cedProf: string, cedEst: string) {
    console.log("en service: ", slot.fecha, slot.horaIni, cedProf, cedEst);
    return this.httpClient.post<any>(`${this.NODE_API_SERVER}/asistirACitaAjena`, {
      dia: slot.fecha,
      hora: slot.horaIni,
      cedProf: cedProf,
      cedEst: cedEst
    }).pipe(tap(res => {
      if (res) {
        console.log("apuntado");
      }
    }));
  }

  noAsistirACitaPublica(citaPublica: CitaPublicaAjenaEstVistaEst, cedProf: string, cedEst: string) {
    return this.httpClient.post<any>(`${this.NODE_API_SERVER}/noAsistirACitaPubAjena`, {
      dia: citaPublica.fecha,
      hora: citaPublica.horaIni,
      cedProf: cedProf,
      cedEst: cedEst
    }).pipe(tap(res => {
      if (res) {
        console.log("no asistir");
      }
    }));
  }

  infoCitaSolicitada(info: DispProfeVistaEst, descripcion: String, espublica: Boolean) {
    window.alert(info.horaFin + espublica + descripcion);
  }

}
