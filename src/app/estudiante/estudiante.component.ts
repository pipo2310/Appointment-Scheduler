import { Component, OnInit } from '@angular/core';
import { Curso } from '../modelo/curso';
import { EstudianteService } from '../services/estudiante.service';
import { Estudiante } from '../modelo/estudiante';
import { Profesor } from '../modelo/profesor';

@Component({
  selector: 'app-home-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent implements OnInit {

  cursos: Curso[]
  selectedCourse:Curso;
  usuarioActual: Estudiante;
  profes: Profesor[];

  constructor(
    private studentService: EstudianteService
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

  onSelect(curso:Curso){
    this.selectedCourse = curso;
    //alert('desplegar lista de profes');
    this.studentService.getProfesores(curso)
    .subscribe(data => {this.profes = data; console.log(this.profes);});
    
    

  }

  ngOnInit() {
    this.getCursos(this.usuarioActual);
  }

  getCursos(estudiante:Estudiante){
    /*this.cursoService.getCursos()
    .subscribe(cursos => this.cursos = cursos);*/
    this.studentService.getCursos(estudiante)
      .subscribe(data => this.cursos = data);
  }
  logout() {
    this.studentService.conmutarLogueado(this.usuarioActual).subscribe();
  }
}
