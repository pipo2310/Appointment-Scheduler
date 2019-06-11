import { Component, OnInit, OnDestroy } from '@angular/core';
import { CITAS } from '../modelo/datosCitas';
import { SEMANAS } from '../modelo/datosPrueba';
import { ProfesorService } from '../services/profesor.service';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Profesor } from '../modelo/profesor';
import { Semana } from '../modelo/semana';
import { Cita } from '../modelo/citasPrueba';
import {Subscription}  from 'rxjs';




@Component({
  selector: 'app-lista-profesor',
  templateUrl: './lista-profesor.component.html',
  styleUrls: ['./lista-profesor.component.css']
})
export class ListaProfesorComponent implements OnInit, OnDestroy {
  semanas = SEMANAS;
  citas = CITAS;
  selectedSemana:Semana;
  citaActual:Cita;

message:string;
  
  usuarioActual: Profesor;
  conmutarLogSub: Subscription;

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

  ngOnDestroy(){

  }
/*
  newMessage() {
    this.data.changeCita(this.citaActual)
  }
*/
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
    //this.router.navigate(['detalleCita']);
    //Parametro o cita se requiere pasar para ver detalles en siguiente pantalla
    this.citaActual=cita;
    
    localStorage.setItem('citaActual', JSON.stringify(this.citaActual));
  }

  //Se aceptan las citas con el checkbox marcado
  cancelarBloque(){

  }
  
  //Se cancelan las citas con el checkbox marcado
  aceptarBloque(){

  }

  getCitaActual(){
    return this.citaActual;
  }
  

}
