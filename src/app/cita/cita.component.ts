import { Component, OnInit, Input } from '@angular/core';
import { Cita } from '../modelo/citasPrueba';
import {ListaProfesorComponent} from '../lista-profesor/lista-profesor.component';


@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css']
})
export class CitaComponent implements OnInit {
  citaMostrar: Cita; //Viene de la otra pantalla
  message:string;
  
  
  listProf : ListaProfesorComponent;

  constructor() {
    let parsed = JSON.parse(localStorage.getItem('citaActual'));

    //this.citaMostrar = this.listProf.getCitaActual();

   }
  

  ngOnInit() {
    
  }

  //Se acepta la cita detallada
  aceptarCita() {

  }
  //Se cancela la cita detallada
  cancelarCita() {

  }


}
