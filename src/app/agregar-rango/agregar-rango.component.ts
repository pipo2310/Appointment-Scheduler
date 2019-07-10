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
import { Subscription } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
//import { Rango } from '../modelo/rangoSuper';

@Component({
  selector: 'app-agregar-rango',
  templateUrl: './agregar-rango.component.html',
  styleUrls: ['./agregar-rango.component.css']
})
export class AgregarRangoComponent implements OnInit {
  rangosRep = RANGOS;
  rangosUnic = RANGOSUNICOS;
  getRangosUnicSubs: Subscription;
  getRangosRepSubs: Subscription;
  rangoActualRep: RangoRepeticion;
  rangoActualUnic: RangoUnico;
  rangosUnicosString: Object[];
  rangosRepString: Object[];
  rangosUnicos: Array<RangoUnico>;
  rangosRepeticion: Array<RangoRepeticion>;
  esconderFecha: boolean;
  fechaInicio = { year: 2019, month: 1, day: 1 };
  fechaFin = { year: 2019, month: 1, day: 1 };
  fechaServIni: string;
  fechaServFin: string;
  fechaInicioF = { year: 2019, month: 1, day: 1 };
  fechaFinF = { year: 2019, month: 1, day: 1 };
  fechaF = { year: 2019, month: 1, day: 1 };
  fechaInicioFInt : string;
  fechaFinFInt : string;
  fechaFInt  : string;
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
    this.esconderFecha = true;
    //this.getRangosConRepeticion();
    //this.getRangosUnicos();

  }

  ngOnInit() {
    this.getRangosConRepeticion();
    this.getRangosUnicos();
  }
  ngOnDestroy() {
    try {
      this.getRangosUnicSubs.unsubscribe();
      this.getRangosRepSubs.unsubscribe();
    } catch (Exception) { }
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
      this.repeticion = false;
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
      //console.log(st.charAt(3));
      //console.log(st.charAt(4));
      //console.log(st.charAt(5));
      //console.log(st);
      numero = +(st.charAt(3) + st.charAt(4));
      //console.log(numero);
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

  openRep(rang: RangoRepeticion, content) {
    let parsed = JSON.parse(localStorage.getItem('rangoActualRep'));
    this.rangoActualRep = parsed;

    this.tiempoInicioInterno.hour = this.hora(rang.horaIni);
    this.tiempoInicioInterno.minute = this.minuto(rang.horaIni);
    console.log(this.tiempoFinInterno.hour = this.hora(rang.horaFin));
    console.log(this.tiempoFinInterno.minute = this.minuto(rang.horaFin));
    this.tiempoFinInterno.hour = this.hora(rang.horaFin);
    this.tiempoFinInterno.minute = this.minuto(rang.horaFin);
    this.fechaInicioF.month = this.mes(rang.fechaInicio);
    this.fechaInicioF.day = this.dia(rang.fechaInicio);
    this.fechaInicioF.year = this.anio(rang.fechaInicio);
    this.fechaFinF.day = this.dia(rang.fechaFinal);
    this.fechaFinF.month = this.mes(rang.fechaFinal);
    this.fechaFinF.year = this.anio(rang.fechaFinal);
    this.fechaInicioFInt=rang.fechaInicio;
    this.fechaFinFInt=rang.fechaFinal

    //console.log(this.rangoActual.fechaFinal);

    /*
    this.tiempoFinInterno.hour = this.hora(this.rangoActualRep.horaFin);
    this.tiempoInicioInterno.hour = this.hora(this.rangoActualRep.horaIni);
    this.tiempoFinInterno.minute = this.minuto(this.rangoActualRep.horaFin);
     
    this.tiempoInicioInterno.minute = this.minuto(this.rangoActualRep.horaIni);
    */
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

  openUnic(rang: RangoUnico, content2) {
    let parsed = JSON.parse(localStorage.getItem('rangoActualUnic'));
    this.rangoActualUnic = parsed;
    //console.log(this.rangoActual.fechaFinal);
    this.tiempoFinInterno.hour = this.hora(rang.horaFin);
    this.tiempoInicioInterno.hour = this.hora(rang.horaIni);
    this.tiempoFinInterno.minute = this.minuto(rang.horaFin);
    this.tiempoInicioInterno.minute = this.minuto(rang.horaIni);
    this.fechaF.day = this.dia(rang.fecha);
    this.fechaF.month = this.mes(rang.fecha);
    this.fechaF.year = this.anio(rang.fecha);
    this.fechaFInt=rang.fecha;
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

  getRangosUnicos() {
    this.rangosUnicos=[];
    let options = { weekday: 'long', month: 'long', day: 'numeric' };
    let tiempoIni:string;
    let tiempoFin:string;
    let diaIni:string;
    this.getRangosUnicSubs = this.profesorService.getRangosUnicos(this.usuarioActual.cedula).subscribe(data => {
      this.rangosUnicosString = data,
        this.rangosUnicosString.forEach(element => {
          tiempoIni = element["horaIni"];//Cambiar el element dependiendo de como salga en result
          tiempoFin = element["horaFin"];//Cambiar el element dependiendo de como salga en result
          //console.log(tiempoIni);
          tiempoIni = tiempoIni.substring(0, tiempoIni.length - 3);
          //console.log(tiempoIni);
          tiempoFin = tiempoFin.substring(0, tiempoFin.length - 3);
          diaIni = (new Date(element["fecha"]).toLocaleDateString("es-ES", options));//Cambiar el element dependiendo de como salga en result
          diaIni = diaIni.charAt(0).toUpperCase() + diaIni.slice(1);
          this.rangosUnicos.push(
            {
              //Cambiar los element dependiendo de como salgan en result
              //cedulaProf: element["cedula"],
              horaIni: tiempoIni,
              horaFin: tiempoFin,
              fecha: diaIni,
              lugar:element["lug"]
            }
          )
        })
    })
  }

/*
  getRangosUnicos() {

    this.getRangosUnicSubs = this.profesorService.getRangosUnicos(this.usuarioActual.cedula).subscribe(data => {
     
    });
  }
  */
  /*
  getRangosConRepeticion(){

    this.getRangosRepSubs = this.profesorService.getRangosconRepeticion(this.usuarioActual.cedula).subscribe(data => {
     
    });
  }
*/

  getRangosConRepeticion() { 
    this.rangosRepeticion=[];
    let tiempoIni:string;
    let tiempoFin:string;
    let diaIni:string;
    let diaFin:string;
    let options = { weekday: 'long', month: 'long', day: 'numeric' };
    this.getRangosRepSubs = this.profesorService.getRangosconRepeticion(this.usuarioActual.cedula).subscribe(data => {
      this.rangosRepString = data,
        this.rangosRepString.forEach(element => {
          tiempoIni = element["horaIni"];
          tiempoFin = element["horaFin"];
          //console.log(tiempoIni);
          tiempoIni = tiempoIni.substring(0, tiempoIni.length - 3);
          //console.log(tiempoIni);
          tiempoFin = tiempoFin.substring(0, tiempoFin.length - 3);
          diaIni = (new Date(element["fechaIni"]).toLocaleDateString("es-ES", options));//Cambiar el element dependiendo de como salga en result
          diaIni = diaIni.charAt(0).toUpperCase() + diaIni.slice(1);
          diaFin = (new Date(element["fechaFin"]).toLocaleDateString("es-ES", options));//Cambiar el element dependiendo de como salga en result
          diaFin = diaFin.charAt(0).toUpperCase() + diaFin.slice(1);
          this.rangosRepeticion.push(
            {
              //Cambiar los element dependiendo de como salgan en result
              //cedulaProf: element["cedula"],
              horaIni: tiempoIni,
              horaFin: tiempoFin,
              fechaInicio: diaIni,
              fechaFinal: diaFin,
              lugar:element["lug"],
              lun:element["lun"],
              mar:element["mar"],
              mier:element["mier"],
              juev:element["juev"],
              vier:element["vier"],
              sab:element["sab"],
             
            }
          )
        })
    })
  }





}



