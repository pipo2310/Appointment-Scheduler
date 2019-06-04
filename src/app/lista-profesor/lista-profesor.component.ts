import { Component, OnInit } from '@angular/core';
import { CITAS } from '../modelo/datosCitas';
import { SEMANAS } from '../modelo/datosPrueba';
import { ProfesorService } from '../services/profesor.service';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Profesor } from '../modelo/profesor';

@Component({
  selector: 'app-lista-profesor',
  templateUrl: './lista-profesor.component.html',
  styleUrls: ['./lista-profesor.component.css']
})
export class ListaProfesorComponent implements OnInit {
  semanas = SEMANAS;
  citas = CITAS;
  usuarioActual: Profesor;
  constructor(private profesorService: ProfesorService, private apiService: ApiService, private router: Router) {
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
  }

  logout() {
    this.apiService.conmutarLogueado(this.usuarioActual);
    //this.profesorService.conmutarLogueado(this.usuarioActual).subscribe();
    this.router.navigate(['login']);
  }
  

}
