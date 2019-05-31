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

import { Component, OnInit, HostListener } from '@angular/core';
import { Curso } from '../modelo/curso';
import { EstudianteService } from '../services/estudiante.service';
import{ CalendarioService} from '../services/calendario-service.service';
import { Estudiante } from '../modelo/estudiante';
import { Profesor } from '../modelo/profesor';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home-estudiante',
  host:{'window:beforeunload':'this.logout'},
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent implements OnInit {

  cursos: Curso[];
  selectedCourse:Curso;
  usuarioActual: Estudiante;
  profes: Profesor[];


  constructor(
    private studentService: EstudianteService,private router: Router
    ) {
      
   
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

  }

  /**
   * busca la lista de profesores que imparten el curso seleccionado.
   * @param curso 
   */

  onSelect(curso:Curso){
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
    this.studentService.getCursos(estudiante)
      .subscribe(data => {this.cursos = data});
  }

  /**
   * devuelve la lista de profesores que dan el curso.
   * @param curso 
   */
  getProfes(curso:Curso){
    this.studentService.getProfesores(curso)
    .subscribe(data => {this.profes = data});
  }

  /**
   * cierra la sesión del usuario. 
   */
  logout() {
    this.studentService.conmutarLogueado(this.usuarioActual).subscribe();
    this.router.navigate(['login']);
  }
  Prof(profeActualCita:Profesor):void{

    

    window.alert(profeActualCita.cedula+profeActualCita.nombre)
    localStorage.setItem('ProfeActualCita', JSON.stringify(profeActualCita));
    this.router.navigate(['CalendarioEstudiante'])
  }
}
