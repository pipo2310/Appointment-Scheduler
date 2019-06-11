import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InMemoryDataService } from './in-memory-data.service';
import { Usuario } from './modelo/usuario';
import { Curso } from './modelo/curso';
import { Profesor } from './modelo/profesor';
import { Estudiante } from './modelo/estudiante';
import { Fecha } from './modelo/fecha';
import { Slot } from './modelo/slot';
import { Cita } from './modelo/cita';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private data: InMemoryDataService, private http: HttpClient) {}

  public login(username: string, password: string): string {
    if (username == "cristian.quesada" && password == '123') {
      return '123456789';
    } else if (username == "prueba" && password == 'prueba') {
      return '000000000';
    } else {
      return null;
    }
  }

  public getUsuario(cedula: string): Usuario {
    var usuario: Usuario;
    if (cedula == '123456789') {
      usuario = this.data.profesor;
    } else if (cedula == '000000000') {
      usuario = this.data.estudiante;
    }
    // Guarda la información del usuario en el almacenamiento local
    localStorage.setItem('usuarioActual', JSON.stringify(usuario));
    return usuario;
  }

  public getCursos(estudiante: Estudiante): Curso[] {
    return this.data.cursosEstudiante;
  }

  public getProfesores(curso: Curso) {
    if (curso.sigla == 'CI-0126') {
      return this.data.profesoresCursoUno;
    } else if (curso.sigla == 'CI-0127') {
      return this.data.profesoresCursoDos;
    } else if (curso.sigla == 'CI-0128') {
      return this.data.profesoresCursoTres;
    } else {
      return null;
    }
  }

  public conmutarLogueado(usuario: Usuario) { }

  public getFechasDisponiblesProfesor(profesor: Profesor, fechaInicial: Date, fechaFinal: Date): Array<Date> {
    var mapaFechas: Map<string, Date> = new Map();
    //
    var fechaSlotProfesor: Date;
    var slotDisponible: boolean;
    for (let slotProfesor of this.data.slotsProfesores) {

      if (slotProfesor.profesor.cedula == profesor.cedula) {
        slotDisponible = true;

        fechaSlotProfesor = new Date(Number(slotProfesor.fecha.año), Number(slotProfesor.fecha.mes) - 1, Number(slotProfesor.fecha.dia)-1);
        if (fechaSlotProfesor >= fechaInicial && fechaSlotProfesor <= fechaFinal) {
          for (let citaEstudiante of this.data.citasEstudiantes) {
            if (slotProfesor.fecha.año == citaEstudiante.fecha.año && slotProfesor.fecha.mes == citaEstudiante.fecha.mes &&
              slotProfesor.fecha.dia == citaEstudiante.fecha.dia && slotProfesor.hora == citaEstudiante.hora) {
                slotDisponible = false;
                break;
            }
          }
          if (slotDisponible) {
            mapaFechas.set( fechaSlotProfesor.getFullYear().toString() + fechaSlotProfesor.getMonth().toString() + fechaSlotProfesor.getDate().toString(),
              fechaSlotProfesor );
          }
        }
      }
    }
    return Array.from(mapaFechas.values());
  }

  public getSlotsDisponiblesDiaProfesor(profesor: Profesor, fecha: Date): Array<Slot> {
    var slots: Array<Slot> = new Array<Slot>();
    //
    var fechaSlotProfesor: Date;
    var slotDisponible: boolean;
    for (let slotProfesor of this.data.slotsProfesores) {
      
      if (slotProfesor.profesor.cedula == profesor.cedula) {
        slotDisponible = true;
        
        if (Number(slotProfesor.fecha.año) == fecha.getFullYear() && ( Number(slotProfesor.fecha.mes) - 1 ) == fecha.getMonth() &&
        Number(slotProfesor.fecha.dia) == fecha.getDate()) {
          for (let citaEstudiante of this.data.citasEstudiantes) {
            if (slotProfesor.fecha.año == citaEstudiante.fecha.año && slotProfesor.fecha.mes == citaEstudiante.fecha.mes &&
              slotProfesor.fecha.dia == citaEstudiante.fecha.dia && slotProfesor.hora == citaEstudiante.hora) {
                slotDisponible = false;
                break;
            }
          }
          if (slotDisponible) {
            slots.push(slotProfesor);
          }
        }
      }
    }
    return slots;
  }

  public getDiasAgendadosEstudiante(estudiante: Estudiante, fechaInicial: Date, fechaFinal: Date): Array<Date> {
    var fechas: Array<Date> = new Array<Date> ();
    //
    return fechas;
  }

  public addNuevoSlot(profesor: Profesor, fechaInicia: Date, fechaFinal: Date, diasSemana: Array<number>, horaInicial: string,  horaFinal: string, lugar: string) {
    // Enviar confirmación
  }

  public addNuevaCita(profesor: Profesor, fecha: Date, hora: string) {
    // Enviar confirmación
  }

}
