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
import { RangoRepeticion } from '../modelo/rangoRepeticion';
import { RangoUnico } from '../modelo/rangoUnico';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { RANGOSUNICOS } from '../modelo/rangoUniqueDatos';
//import { Rango } from '../modelo/rangoSuper';

@Component({
  selector: 'app-agregar-rango',
  templateUrl: './agregar-rango.component.html',
  styleUrls: ['./agregar-rango.component.css']
})
export class AgregarRangoComponent implements OnInit {
  rangosRep = RANGOS;
  rangosUnic = RANGOSUNICOS;
  
  rangoActualRep:RangoRepeticion;
  rangoActualUnic: RangoUnico;
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
  tiempoInicio = { hour: 7, minute: 0 };
  tiempoFin = { hour: 7, minute: 15 };
  lunes: boolean;
  martes: boolean;
  miercoles: boolean;
  jueves: boolean;
  viernes: boolean;
  sabado: boolean;
  usuarioActual: Profesor;
  repeticion: boolean;

  constructor(private profesorService: ProfesorService, private modalService: NgbModal, private confirmationDialogService: ConfirmationDialogService) {
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
    if (this.tiempoInicio.hour.toString().length == 1 && this.tiempoInicio.minute.toString().length == 1) {
      this.tiempoServIni = "0" + this.tiempoInicio.hour + ":" + this.tiempoInicio.minute + "0";
      //this.tiempoServFin = this.tiempoFin.hour + ":" + this.tiempoFin.minute;
    } else if (this.tiempoInicio.hour.toString().length == 1 && this.tiempoInicio.minute.toString().length > 1) {
      this.tiempoServIni = "0" + this.tiempoInicio.hour + ":" + this.tiempoInicio.minute;
    } else if (this.tiempoInicio.hour.toString().length > 1 && this.tiempoInicio.minute.toString().length == 1) {
      this.tiempoServIni = this.tiempoInicio.hour + ":" + this.tiempoInicio.minute + "0";
    } else if (this.tiempoInicio.hour.toString().length > 1 && this.tiempoInicio.minute.toString().length > 1) {
      this.tiempoServIni = this.tiempoInicio.hour + ":" + this.tiempoInicio.minute;
    }

    if (this.tiempoFin.hour.toString().length == 1 && this.tiempoFin.minute.toString().length == 1) {
      this.tiempoServFin = "0" + this.tiempoFin.hour + ":" + this.tiempoFin.minute + "0";
      //this.tiempoServFin = this.tiempoFin.hour + ":" + this.tiempoFin.minute;
    } else if (this.tiempoFin.hour.toString().length == 1 && this.tiempoFin.minute.toString().length > 1) {
      this.tiempoServFin = "0" + this.tiempoFin.hour + ":" + this.tiempoFin.minute;
    } else if (this.tiempoFin.hour.toString().length > 1 && this.tiempoFin.minute.toString().length == 1) {
      this.tiempoServFin = this.tiempoFin.hour + ":" + this.tiempoFin.minute + "0";
    } else if (this.tiempoFin.hour.toString().length > 1 && this.tiempoFin.minute.toString().length > 1) {
      this.tiempoServFin = this.tiempoFin.hour + ":" + this.tiempoFin.minute;
    }





    //this.tiempoServIni = this.tiempoInicio.hour + ":" + this.tiempoInicio.minute;
    //this.tiempoServFin = this.tiempoFin.hour + ":" + this.tiempoFin.minute;

    console.log(this.tiempoServIni);
    console.log(this.tiempoServFin);
    // this.fechaServIni=this.fechaInicio["year"]+"-"+this.fechaInicio["month"]+"-"+this.fechaInicio["day"];
    // this.fechaServFin=this.fechaFin["year"]+"-"+this.fechaInicio["month"]+"-"+this.fechaInicio["day"];
    //Falta establecer la condicion de repeticion con los dias 
    if (this.lunes == false && this.martes == false && this.miercoles == false && this.jueves == false && this.viernes == false && this.sabado == false) {
      this.repeticion =false;
    } else { this.repeticion = true; }
    //console.log(this.repeticion);
    if (this.repeticion == true) {
      //console.log("ENTRE A PRIMERA FASE");
      this.profesorService.crearRangoDisponibilidadConRepeticion(this.usuarioActual.cedula,
        this.parseISOString(this.fechaInicio).toISOString(),
        this.parseISOString(this.fechaFin).toISOString(),
        this.tiempoServIni, this.tiempoServFin, lugar, this.lunes, this.martes, this.miercoles, this.jueves, this.viernes, this.sabado).subscribe(data => { });
    } else {
      this.profesorService.crearDisponibilidadUnica(this.usuarioActual.cedula, this.parseISOString(this.fechaInicio).toISOString(),
        this.tiempoServIni, this.tiempoServFin, lugar).subscribe(data => { });

    }


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

  irARangoRep(rang: RangoRepeticion) {
    this.rangoActualRep = rang;
    localStorage.setItem('rangoActualRep', JSON.stringify(this.rangoActualRep));
  }

  irARangoUnic(rang: RangoUnico) {
    this.rangoActualUnic = rang;
    localStorage.setItem('rangoActualUnic', JSON.stringify(this.rangoActualUnic));
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

  openRep(content) {
    let parsed = JSON.parse(localStorage.getItem('rangoActualRep'));
    this.rangoActualRep = parsed;
    //console.log(this.rangoActual.fechaFinal);
    this.tiempoFinInterno.hour = this.hora(this.rangoActualRep.horaFin);
    this.tiempoInicioInterno.hour = this.hora(this.rangoActualRep.horaIni);
    this.tiempoFinInterno.minute = this.minuto(this.rangoActualRep.horaFin);
    this.tiempoInicioInterno.minute = this.minuto(this.rangoActualRep.horaIni);
    //console.log(this.dia(this.rangoActual.fechaInicio));
    //console.log(this.mes(this.rangoActual.fechaInicio));
    //console.log(this.anio(this.rangoActual.fechaInicio));
   

    /*
    this.fechaInicio2.day = this.dia(this.rangoActual.fechaInicio);
    this.fechaInicio2.month = this.mes(this.rangoActual.fechaInicio);
    this.fechaInicio2.year = this.anio(this.rangoActual.fechaInicio);
    //this.fechaFin.day = this.dia(this.rangoActual.fechaFinal);
    //this.fechaFin.month = this.mes(this.rangoActual.fechaFinal);
    //this.fechaFin.year = this.anio(this.rangoActual.fechaFinal);
   */

    //this.rangoActual.
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openUnic(content2) {
    let parsed = JSON.parse(localStorage.getItem('rangoActualUnic'));
    this.rangoActualUnic = parsed;
    //console.log(this.rangoActual.fechaFinal);
    this.tiempoFinInterno.hour = this.hora(this.rangoActualUnic.horaFin);
    this.tiempoInicioInterno.hour = this.hora(this.rangoActualUnic.horaIni);
    this.tiempoFinInterno.minute = this.minuto(this.rangoActualUnic.horaFin);
    this.tiempoInicioInterno.minute = this.minuto(this.rangoActualUnic.horaIni);
    //console.log(this.dia(this.rangoActual.fechaInicio));
    //console.log(this.mes(this.rangoActual.fechaInicio));
    //console.log(this.anio(this.rangoActual.fechaInicio));
   

    /*
    this.fechaInicio2.day = this.dia(this.rangoActual.fechaInicio);
    this.fechaInicio2.month = this.mes(this.rangoActual.fechaInicio);
    this.fechaInicio2.year = this.anio(this.rangoActual.fechaInicio);
    //this.fechaFin.day = this.dia(this.rangoActual.fechaFinal);
    //this.fechaFin.month = this.mes(this.rangoActual.fechaFinal);
    //this.fechaFin.year = this.anio(this.rangoActual.fechaFinal);
   */

    //this.rangoActual.
    this.modalService.open(content2, { ariaLabelledBy: 'modal-basic-title2' }).result.then((result) => {
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

  modificarRangoRep() {
    this.confirmationDialogService.confirm('Favor confirmar', 'Realmente quieres modificar este rango?')
      .then((confirmed) => this.modificarConfRep(confirmed))
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));

  }
  eliminarRangoRep() {
    this.confirmationDialogService.confirm('Favor confirmar', 'Realmente quieres eliminar este rango?')
      .then((confirmed) => this.eliminarConfRep(confirmed))
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));

  }

  
  modificarRangoUnic() {
    this.confirmationDialogService.confirm('Favor confirmar', 'Realmente quieres modificar este rango?')
      .then((confirmed) => this.modificarConfUnic(confirmed))
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));

  }

  eliminarRangoUnic() {
    this.confirmationDialogService.confirm('Favor confirmar', 'Realmente quieres eliminar este rango?')
      .then((confirmed) => this.eliminarConfUnic(confirmed))
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));

  }

  modificarConfRep(conf: boolean) {
    if (conf == true) {
      let parsed = JSON.parse(localStorage.getItem('rangoActualRep'));
      this.rangoActualRep = parsed;
      //llamada a base
    }

  }

  eliminarConfRep(conf: boolean) {
    if (conf == true) {
      let parsed = JSON.parse(localStorage.getItem('rangoActualRep'));
      this.rangoActualRep = parsed;
      //llamada a base
    }
  }

  modificarConfUnic(conf: boolean) {
    if (conf == true) {
      let parsed = JSON.parse(localStorage.getItem('rangoActualUnic'));
      this.rangoActualUnic = parsed;
      //llamada a base
    }

  }

  eliminarConfUnic(conf: boolean) {
    if (conf == true) {
      let parsed = JSON.parse(localStorage.getItem('rangoActualUnic'));
      this.rangoActualUnic = parsed;
      //llamada a base
    }
  }





}



