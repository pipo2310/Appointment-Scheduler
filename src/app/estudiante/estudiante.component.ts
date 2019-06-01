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

import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Curso } from '../modelo/curso';
import { EstudianteService } from '../services/estudiante.service';
import { ApiService } from '../api.service';
import { Estudiante } from '../modelo/estudiante';
import { Profesor } from '../modelo/profesor';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home-estudiante',
  host:{'window:beforeunload':'this.logout'},
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent implements OnInit, OnDestroy {

  cursos: Curso[];
  selectedCourse:Curso;
  usuarioActual: Estudiante;
  profes: Profesor[];


  ngOnDestroy(): void{
    this.logout();
  }
  constructor(
    private studentService: EstudianteService, private apiService: ApiService, private router: Router) {
      
   
    // Extrae la información del usuario guardada en el almacenamiento local por el login service
    let parsed = JSON.parse(localStorage.getItem('usuarioActual'));
    // Interpreta al usuario como un estudiante
    this.usuarioActual = {
      cedula: parsed['cedula'],
      email: parsed['email'],
      nombre: parsed['nombre'],
      primerApellido: parsed['primerApellido'],
      segundoApellido: parsed['segundoApellido'],
      carne: parsed['carne']
    };

    // TODO: PRUEBA
    let profesor: Profesor = {
      cedula : '123456789',
      email : 'cristian.quesada@example.com',
      nombre : 'CRISTIAN ULISES',
      primerApellido : 'QUESADA',
      segundoApellido : 'LOPEZ',
    };
    let fechaInicial = new Date (2019,5,1);
    let fechaFinal = new Date (2019,6,15);
    let fechasDisponibles = this.apiService.getFechasDisponiblesProfesor(profesor, fechaInicial, fechaFinal);
    let slotsDisponiblesDia = this.apiService.getSlotsDisponiblesDiaProfesor(profesor, new Date (2019,6,17));
    console.log(fechasDisponibles);
    console.log(slotsDisponiblesDia);
  }

  /**
   * busca la lista de profesores que imparten el curso seleccionado.
   * @param curso 
   */

  onSelect(curso:Curso){
    this.profes = []
    this.selectedCourse = curso;
    this.getProfes(this.selectedCourse);
   
  }

  ngOnInit() {
    this.getCursos(this.usuarioActual);
  }

  /**
   * devuelve los cursos en los que está matriculado el estudiante.
   * @param estudiante 
   */
  getCursos(estudiante:Estudiante){
    this.cursos = this.apiService.getCursos(estudiante);
    // this.studentService.getCursos(estudiante)
    //   .subscribe(data => {this.cursos = data});
  }

  /**
   * devuelve la lista de profesores que dan el curso.
   * @param curso 
   */
  getProfes(curso:Curso){
    this.profes = this.apiService.getProfesores(curso);
    // this.studentService.getProfesores(curso)
    // .subscribe(data => {this.profes = data});
  }

  /**
   * cierra la sesión del usuario. 
   */
  logout() {
    this.apiService.conmutarLogueado(this.usuarioActual);
    //this.studentService.conmutarLogueado(this.usuarioActual).subscribe();
    this.router.navigate(['login']);
  }
  Prof(profeActualCita:Profesor):void{
    window.alert(profeActualCita.cedula+profeActualCita.nombre)
    localStorage.setItem('ProfeActualCita', JSON.stringify(profeActualCita));
    this.router.navigate(['CalendarioEst'])
  }
}
