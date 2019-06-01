import { Injectable } from '@angular/core';
import { Profesor } from './modelo/profesor';
import { Curso } from './modelo/curso';
import { Estudiante } from './modelo/estudiante';
import { Slot } from './modelo/slot';
import { Cita } from './modelo/cita';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {

  constructor() { }

  public profesor: Profesor = {
    cedula : '123456789',
    email : 'cristian.quesada@example.com',
    nombre : 'CRISTIAN ULISES',
    primerApellido : 'QUESADA',
    segundoApellido : 'LOPEZ',
  };

  public profesorDos : Profesor = {
    cedula : '453453453',
    email : 'marcelo.jenkins@example.com',
    nombre : 'MARCELO',
    primerApellido : 'JENKINS',
    segundoApellido : 'CORONAS',
  }

  public profesorTres: Profesor = {
    cedula : '666448888',
    email : 'alexandra.martinez@example.com',
    nombre : 'ALEXANDRA MARIA',
    primerApellido : 'MARTINEZ',
    segundoApellido : 'PORRAS',
  }

  public cursoUno: Curso = {
    sigla: 'CI-0126',
    nombre: 'Ingeniería de Software'
  };

  public profesoresCursoUno: Profesor[] = [
    this.profesor
  ]

  public cursoDos: Curso = {
    sigla: 'CI-0127',
    nombre: 'Bases de datos'
  };

  public profesoresCursoDos: Profesor[] = [
    this.profesorTres
  ]

  public cursoTres: Curso = {
    sigla: 'CI-0128',
    nombre: 'Proyecto Integrador de Ingeniería de Software y Bases de Datos'
  };

  public profesoresCursoTres: Profesor[] = [
    this.profesor, this.profesorDos, this.profesorTres
  ]

  public cursosEstudiante: Curso[] = [
    this.cursoUno, this.cursoDos, this.cursoTres
  ]

  public estudiante: Estudiante = {
    cedula : '000000000',
    email : 'prueba@example.com',
    nombre : 'USUARIO PRUEBA',
    primerApellido : 'APELLIDO',
    segundoApellido : 'APELLIDO',
    carne : 'B00000'
  };

  public slotsProfesores: Slot[] = [
    {
      fecha: {"año": "2019", "mes": "07", "dia": "17"},
      hora: "9:00",
      profesor: this.profesor,
      lugar: "232 ECCI",
    }
  ]
  

  public citasEstudiantes: Cita[] = new Array<Cita>();
}
