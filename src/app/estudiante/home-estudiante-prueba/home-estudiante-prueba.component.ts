import { Component, OnInit } from '@angular/core';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { Estudiante } from 'src/app/modelo/estudiante';

@Component({
  selector: 'app-home-estudiante-prueba',
  templateUrl: './home-estudiante-prueba.component.html',
  styleUrls: ['./home-estudiante-prueba.component.css']
})
export class HomeEstudiantePruebaComponent implements OnInit {
  usuarioActual: Estudiante;

  constructor(private servicio: EstudianteService) {
    // Extrae la información del usuario guardada en el almacenamiento local por el login service
    let parsed = JSON.parse(localStorage.getItem('usuarioActual'));
    // Interpreta al usuario como un estudiante
    this.usuarioActual = {
      cedula : parsed['cedula'],
      email : parsed['email'],
      nombre : parsed['nombre'],
      primerApellido : parsed['primerApellido'],
      segundoApellido : parsed['segundoApellido'],
      carne : parsed['carne']
    };
  }

  ngOnInit() {
    console.log("Hola " + this.usuarioActual.nombre + "!");
    console.log(this.usuarioActual);
  }

}
