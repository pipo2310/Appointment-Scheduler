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
    let parsed = JSON.parse(localStorage.getItem('usuarioActual'));
    console.log(parsed);
  }

  ngOnInit() {
  }

}
