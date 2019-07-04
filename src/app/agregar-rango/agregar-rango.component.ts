import { Component, OnInit } from '@angular/core';
import { NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';
import { timeInterval } from 'rxjs/operators';
import { ProfesorService } from '../services/profesor.service';
import { Usuario } from '../modelo/usuario';
import { Profesor } from '../modelo/profesor';
import { RANGOS } from '../modelo/rangoDatos';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';
import { Time } from '@angular/common';
import { Rango } from '../modelo/rango';

@Component({
  selector: 'app-agregar-rango',
  templateUrl: './agregar-rango.component.html',
  styleUrls: ['./agregar-rango.component.css']
})
export class AgregarRangoComponent implements OnInit {
  rangos = RANGOS;
  rangoActual: Rango;
  fechaInicio = { year: 2019, month: 1, day: 1 };
  fechaFin = { year: 2019, month: 1, day: 1 };
  fechaServIni: string;
  fechaServFin: string;
  fechaInicio2 = { year: 2019, month: 1, day: 1 };
  //fechaFin2 = { year: 2019, month: 1, day: 1 };
  tiempoServIni: string;
  tiempoServFin: string;
  closeResult: string;
  //tiempoInicio;
  //tiempoFin;
  tiempoFinInterno = { hour: 0, minute: 0 };
  tiempoInicioInterno = { hour: 0, minute: 0 };
  tiempoInicio = { hour: 0, minute: 0 };
  tiempoFin = { hour: 0, minute: 0 };
  lunes: boolean;
  martes: boolean;
  miercoles: boolean;
  jueves: boolean;
  viernes: boolean;
  sabado: boolean;
  usuarioActual: Profesor;

  constructor(private profesorService: ProfesorService, private modalService: NgbModal) {
    let parsed2 = JSON.parse(localStorage.getItem('usuarioActual'));
    // Interpreta al usuario como un profesor
    this.usuarioActual = {
      cedula: parsed2['cedula'],
      email: parsed2['email'],
      nombre: parsed2['nombre'],
      primerApellido: parsed2['primerApellido'],
      segundoApellido: parsed2['segundoApellido']
    };

    this.lunes = false;
    this.martes = false;
    this.miercoles = false;
    this.jueves = false;
    this.viernes = false;
    this.sabado = false;


  }

  ngOnInit() {
  }

 
  //Recupera los elementos seleccionados anteriormente y los manda como parametros al servicio
  agregar(lugar: string) {
    /*
        console.log("----> ", this.tiempoInicio);
        console.log("----> ", this.tiempoFin);
        console.log("----> ", lugar);
        console.log("----> ", this.fechaInicio);
        console.log("----> ", this.fechaInicio["month"]);
        console.log("----> ", this.fechaFin);
        console.log("----> ", this.lunes);
        console.log("----> ", this.martes);
        console.log("----> ", this.miercoles);
        console.log("----> ", this.jueves);
        console.log("----> ", this.viernes);
        console.log("----> ", this.sabado);
      */

    //console.log(this.usuarioActual);
    //console.log(this.usuarioActual.cedula);
    console.log(this.parseISOString(this.fechaInicio).toISOString());
    console.log(this.parseISOString(this.fechaFin).toISOString());
    if (this.tiempoInicio.hour.toString().length==1 && this.tiempoInicio.minute.toString().length==1)
    {
      this.tiempoServIni = "0"+this.tiempoInicio.hour + ":" + this.tiempoInicio.minute+"0";
      //this.tiempoServFin = this.tiempoFin.hour + ":" + this.tiempoFin.minute;
    }else if(this.tiempoInicio.hour.toString().length==1 && this.tiempoInicio.minute.toString().length>1){
      this.tiempoServIni = "0"+this.tiempoInicio.hour + ":" + this.tiempoInicio.minute;
    }else if(this.tiempoInicio.hour.toString().length>1 && this.tiempoInicio.minute.toString().length==1){
      this.tiempoServIni = this.tiempoInicio.hour + ":" + this.tiempoInicio.minute+"0";
    }else if(this.tiempoInicio.hour.toString().length>1 && this.tiempoInicio.minute.toString().length>1){
      this.tiempoServIni = this.tiempoInicio.hour + ":" + this.tiempoInicio.minute;
    }

    if (this.tiempoFin.hour.toString().length==1 && this.tiempoFin.minute.toString().length==1)
    {
      this.tiempoServFin = "0"+this.tiempoFin.hour + ":" + this.tiempoFin.minute+"0";
      //this.tiempoServFin = this.tiempoFin.hour + ":" + this.tiempoFin.minute;
    }else if(this.tiempoFin.hour.toString().length==1 && this.tiempoFin.minute.toString().length>1){
      this.tiempoServFin = "0"+this.tiempoFin.hour + ":" + this.tiempoFin.minute;
    }else if(this.tiempoFin.hour.toString().length>1 && this.tiempoFin.minute.toString().length==1){
      this.tiempoServFin = this.tiempoFin.hour + ":" + this.tiempoFin.minute+"0";
    }else if(this.tiempoFin.hour.toString().length>1 && this.tiempoFin.minute.toString().length>1){
      this.tiempoServFin = this.tiempoFin.hour + ":" + this.tiempoFin.minute;
    }
  
    



    //this.tiempoServIni = this.tiempoInicio.hour + ":" + this.tiempoInicio.minute;
    //this.tiempoServFin = this.tiempoFin.hour + ":" + this.tiempoFin.minute;

    console.log(this.tiempoServIni);
    console.log(this.tiempoServFin);
    // this.fechaServIni=this.fechaInicio["year"]+"-"+this.fechaInicio["month"]+"-"+this.fechaInicio["day"];
    // this.fechaServFin=this.fechaFin["year"]+"-"+this.fechaInicio["month"]+"-"+this.fechaInicio["day"];


    this.profesorService.crearRangoDisponibilidadConRepeticion(this.usuarioActual.cedula,
      this.parseISOString(this.fechaInicio).toISOString(),
      this.parseISOString(this.fechaFin).toISOString(),
      this.tiempoServIni, this.tiempoServFin, lugar, this.lunes, this.martes, this.miercoles, this.jueves, this.viernes, this.sabado).subscribe(data => { });

  }

  parseISOString(s: any) {

    return new Date(Number(s["year"]), Number(s["month"]) - 1, Number(s["day"]));
  }

  /*
  parseTimeString(s: any) {
    
    return new ();
  }
  */

  hora(st: string) {
    let numero: number;
    //console.log(st);
    if (st == '') {
      //console.log(st);
      return 0;


    } else {
      //console.log(st);
      numero = +st.substr(0, 2);
      return numero;
    }

  }

  irARango(rang: Rango) {
    this.rangoActual = rang;
    localStorage.setItem('rangoActual', JSON.stringify(this.rangoActual));
  }

  minuto(st: string) {

    let numero: number;
    //console.log(st);
    if (st == '') {
      //console.log(st);
      return 0;

    } else {
      //console.log(st);
      numero = +st.substr(4, 6);
      return numero;
    }

  }

  dia(st: string) {

    let numero: number;
    //console.log(st);
    if (st == '') {
      //console.log(st);
      return 0;

    } else {
      //console.log(st);
      numero = +st.substr(0, 2);
      return numero;
    }

  }

  mes(st: string) {

    let numero: number;
    //console.log(st);
    if (st == '') {
      //console.log(st);
      return 0;

    } else {
      //console.log(st);
      numero = +(st.charAt(3) + st.charAt(4));
      return numero;
    }

  }

  anio(st: string) {

    let numero: number;
    //console.log(st);
    if (st == '') {
      //console.log(st);
      return 0;

    } else {
      //console.log(st);
      numero = +st.substr(6, 10);
      return numero;
    }

  }

  open(content) {
    let parsed = JSON.parse(localStorage.getItem('rangoActual'));
    this.rangoActual = parsed;
    //console.log(this.rangoActual.fechaFinal);
    this.tiempoFinInterno.hour = this.hora(this.rangoActual.horaFin);
    this.tiempoInicioInterno.hour = this.hora(this.rangoActual.horaIni);
    this.tiempoFinInterno.minute = this.minuto(this.rangoActual.horaFin);
    this.tiempoInicioInterno.minute = this.minuto(this.rangoActual.horaIni);
    console.log(this.dia(this.rangoActual.fechaInicio));
    console.log(this.mes(this.rangoActual.fechaInicio));
    console.log(this.anio(this.rangoActual.fechaInicio));
    this.fechaInicio2.day = this.dia(this.rangoActual.fechaInicio);
    this.fechaInicio2.month = this.mes(this.rangoActual.fechaInicio);
    this.fechaInicio2.year = this.anio(this.rangoActual.fechaInicio);
    //this.fechaFin.day = this.dia(this.rangoActual.fechaFinal);
    //this.fechaFin.month = this.mes(this.rangoActual.fechaFinal);
    //this.fechaFin.year = this.anio(this.rangoActual.fechaFinal);


    //this.rangoActual.
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



}



