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
import * as aws from 'aws-sdk'
import * as S3 from 'aws-sdk/clients/s3'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'homeStudent' })
};

@Injectable({
  providedIn: 'root'
})

export class CalendarService {
  //conexión a la base de datos
  //PHP_API_SERVER = "http://ec2-18-207-248-234.compute-1.amazonaws.com";
  NODE_API_SERVER = "http://ec2-34-239-46-160.compute-1.amazonaws.com:3000";

  constructor(private httpClient: HttpClient) { }

  /**
   * devuelve la lista de cursos en los que está matriculado el estudiante.
   * @param estudiante 
   */
  public getHorarioDispProfe(cedula: string, fechaInicio: string, fechaFinal: string): Observable<any> {
    let fechas;
    return this.httpClient.post<any>(`${this.NODE_API_SERVER}/dispHoraProf`, {
      cedula: cedula,
      diaIni: fechaInicio,
      diaFin: fechaFinal
    }).pipe(tap(res => {
      fechas = res;
    }));
  }

  public getEventosEst(cedEst: String, fecha: string, cedProf: string, sigla: string): Observable<any> {
    let eventos: Object[];
    return this.httpClient.post<any>(`${this.NODE_API_SERVER}/citasUnDiaEst`, {
      cedulaEst: cedEst,
      fecha: fecha,
      cedulaProf: cedProf,
      sigla: sigla
    }).pipe(tap(res => {
      eventos = res;
    }));
  }

  public getDiasConCitaEst(diaIni: string, diaFin: string, cedProf: string, cedEst: string, sigla: string): Observable<any> {
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

  insertarCita(cedEst: string, cedProf: string, sigla: string, fecha: string, hora: string, descripcion: string, publica: number, file: File) {
    var filename;
    var key;

    if (file != null) {
      // console.log("Archivo en inserCita de service: " + file.name);
      const date = new Date();
      const timestamp = date.getTime();
      filename = file.name
      key = timestamp + '/' + filename
      const bucket = new S3(
        {
          accessKeyId: 'AKIAUCE7JJ35NWW5R3UR',
          secretAccessKey: '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',
          region: 'us-east-1'
        }
      );

      const params = {
        Bucket: 'filehost-umeeter',
        Key: key,
        Body: file,
        Type: file.type
      };

      bucket.upload(params, function (err, data) {
        if (err) {
          // console.log('error in callback');
          console.log(err);
        } else {
          // console.log('success');
          console.log(data);
        }
      }).promise().then(res =>{
        console.log(res, " en calendario-service")
      });
    }

    return this.httpClient.post<any>(`http://localhost:3000/insertCitaBloque`, {
      cedulaEst: cedEst,
      cedulaProf: cedProf,
      curso: sigla,
      fecha: fecha,
      hora: hora,
      descrip: descripcion,
      pub: publica,
      key: key
    }).pipe(tap(res => {
    }));

  }

  cancelarConsultaPrivada(informacionCita: CitaPrivadaVistaEst, cedProf: string, cedEst: string) {
    return this.httpClient.post<any>(`${this.NODE_API_SERVER}/cancelarCitaPrivada`, {
      dia: informacionCita.fecha,
      hora: informacionCita.horaIni,
      cedProf: cedProf,
      cedEst: cedEst
    }).pipe(tap(res => {
    }));
  }

  cancelarConsultaPublica(citaPublica: CitaPublicaPropiaEstVistaEst, cedProf: string, cedEst: string) {
    return this.httpClient.post<any>(`${this.NODE_API_SERVER}/noAsistirACitaPropia`, {
      dia: citaPublica.fecha,
      hora: citaPublica.horaIni,
      cedProf: cedProf,
      cedEst: cedEst
    }).pipe(tap(res => {
    }));
  }


  asistirACitaPublica(slot: DispCitaPublicaVistaEst, cedProf: string, cedEst: string) {
    return this.httpClient.post<any>(`${this.NODE_API_SERVER}/asistirACitaAjena`, {
      dia: slot.fecha,
      hora: slot.horaIni,
      cedProf: cedProf,
      cedEst: cedEst
    }).pipe(tap(res => {
    }));
  }

  noAsistirACitaPublica(citaPublica: CitaPublicaAjenaEstVistaEst, cedProf: string, cedEst: string) {
    return this.httpClient.post<any>(`${this.NODE_API_SERVER}/noAsistirACitaPubAjena`, {
      dia: citaPublica.fecha,
      hora: citaPublica.horaIni,
      cedProf: cedProf,
      cedEst: cedEst
    }).pipe(tap(res => {
    }));
  }

  infoCitaSolicitada(info: DispProfeVistaEst, descripcion: String, espublica: Boolean) {
    window.alert(info.horaFin + espublica + descripcion);
  }

}
