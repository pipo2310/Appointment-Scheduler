import { Component, OnInit } from '@angular/core';
import { NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';
import { timeInterval } from 'rxjs/operators';

@Component({
  selector: 'app-agregar-rango',
  templateUrl: './agregar-rango.component.html',
  styleUrls: ['./agregar-rango.component.css']
})
export class AgregarRangoComponent implements OnInit {

  fechaInicio;
  fechaFin;

  tiempoInicio = {hour: 0, minute: 0};
  tiempoFin = {hour: 0, minute: 0};
  lunes:boolean;
  martes:boolean;
  miercoles:boolean;
  jueves:boolean;
  viernes:boolean;
  sabado:boolean;

  constructor() {
    this.lunes=false;
    this.martes=false;
    this.miercoles=false;
    this.jueves=false;
    this.viernes=false;
    this.sabado=false;
  }

  ngOnInit() {
  }

  //Recupera los elementos seleccionados anteriormente y los manda como parametros al servicio
  agregar(lugar:string) {
    console.log("----> ", this.tiempoInicio);
    console.log("----> ", this.tiempoFin);
    console.log("----> ", lugar);
    console.log("----> ", this.fechaInicio);
    console.log("----> ", this.fechaFin);
    console.log("----> ", this.lunes);
    console.log("----> ", this.martes);
    console.log("----> ", this.miercoles);
    console.log("----> ", this.jueves);
    console.log("----> ", this.viernes);
    console.log("----> ", this.jueves);
  }

}
