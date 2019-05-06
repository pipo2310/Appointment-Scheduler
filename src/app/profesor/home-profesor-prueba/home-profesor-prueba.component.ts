import { Component, OnInit } from '@angular/core';
import { ProfesorService } from 'src/app/services/profesor.service';
import { Profesor } from 'src/app/modelo/profesor';

@Component({
  selector: 'app-home-profesor-prueba',
  templateUrl: './home-profesor-prueba.component.html',
  styleUrls: ['./home-profesor-prueba.component.css']
})
export class HomeProfesorPruebaComponent implements OnInit {
  usuarioActual: Profesor;

  constructor(private servicio: ProfesorService) {
    // Extrae la información del usuario guardada en el almacenamiento local por el login service
    let parsed = JSON.parse(localStorage.getItem('usuarioActual'));
    // Interpreta al usuario como un profesor
    this.usuarioActual = {
      cedula : parsed['cedula'],
      email : parsed['email'],
      nombre : parsed['nombre'],
      primerApellido : parsed['primerApellido'],
      segundoApellido : parsed['segundoApellido']
    };
  }

  ngOnInit() {
    window.alert("Hola " + this.usuarioActual.nombre + "!");
    console.log(this.usuarioActual);
  }

}
