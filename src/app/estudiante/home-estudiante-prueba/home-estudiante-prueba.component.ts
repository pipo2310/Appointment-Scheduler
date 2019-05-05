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
    let parsed = JSON.parse(localStorage.getItem('usuarioActual'));
    console.log(parsed);
  }

  ngOnInit() {
  }

}
