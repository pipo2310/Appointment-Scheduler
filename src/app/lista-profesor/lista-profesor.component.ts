import { Component, OnInit } from '@angular/core';
import { CITAS } from '../modelo/datosCitas';
import { SEMANAS } from '../modelo/datosPrueba';
import { ProfesorService } from '../services/profesor.service';
import { Router } from '@angular/router';
import { Profesor } from '../modelo/profesor';
import { Semana } from '../modelo/semana';
import { Cita } from '../modelo/citasPrueba';



@Component({
  selector: 'app-lista-profesor',
  templateUrl: './lista-profesor.component.html',
  styleUrls: ['./lista-profesor.component.css']
})
export class ListaProfesorComponent implements OnInit {
  semanas = SEMANAS;
  citas = CITAS;
  selectedSemana:Semana;


  
  usuarioActual: Profesor;
  constructor(private profesorService: ProfesorService,private router: Router) {
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
    this.profesorService.conmutarLogueado(this.usuarioActual).subscribe();
   this.router.navigate(['login']);
  }

  rangos(){
    this.router.navigate(['definirRango']);
  }

  onSelect(sem:Semana){
    
    this.getCitas(this.selectedSemana);
   
  }

  getCitas(sem:Semana)
  {

  }

  irADetalles(cita:Cita)
  {
    this.router.navigate(['detalleCita']);
  }

  //Se aceptan las citas con el checkbox marcado
  cancelarBloque(){

  }
  
  //Se cancelan las citas con el checkbox marcado
  aceptarBloque(){

  }
  

}
