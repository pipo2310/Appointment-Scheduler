import { Component, OnInit, Input } from '@angular/core';
import { Cita } from '../modelo/citasPrueba';
import { ListaProfesorComponent } from '../lista-profesor/lista-profesor.component';
import { CitaVistaProf } from '../modelo/citaVistaProf';
import { ObjetoCita } from '../modelo/objetoCita';
import { ProfesorService } from '../services/profesor.service';
import { Usuario } from '../modelo/usuario';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css']
})
export class CitaComponent implements OnInit {
  citaActual: CitaVistaProf; //Viene de la otra pantalla
  objetoCita: ObjetoCita;
  objCitasString: Object[];
  message: string;
  estado: boolean;
  usuarioActual: Usuario;
  esconderDatosCedula: boolean;
  esconderContador:boolean;
  citasObjetos: Array<ObjetoCita>;
  x: any;


  listProf: ListaProfesorComponent;

  constructor(private profesorService: ProfesorService) {
    let parsed2 = JSON.parse(localStorage.getItem('usuarioActual'));
    // Interpreta al usuario como un profesor
    this.usuarioActual = {
      cedula: parsed2['cedula'],
      email: parsed2['email'],
      nombre: parsed2['nombre'],
      primerApellido: parsed2['primerApellido'],
      segundoApellido: parsed2['segundoApellido']
    };
    let parsed = JSON.parse(localStorage.getItem('citaActual'));
    this.citaActual = parsed;
    if (this.citaActual.estado == 'Aprobado') {
      this.estado = true;
    } else {
      this.estado = false;
    }

    if (this.citaActual.cedulaEst == null) {
      this.esconderDatosCedula = true;

    } else {
      this.esconderDatosCedula = false;
    }

    this.objetoCita = new ObjetoCita;
    this.getCitaCompleta();


    //this.citaMostrar = this.listProf.getCitaActual();

  }


  ngOnInit() {

  }

  //Se acepta la cita detallada
  aceptarCita() {
    this.profesorService.aceptarCita(this.usuarioActual.cedula, this.citaActual.diaSinParsear, this.citaActual.horaInicio).subscribe(data => { });

  }
  //Se cancela la cita detallada
  cancelarCita() {
    this.profesorService.cancelarCita(this.usuarioActual.cedula, this.citaActual.diaSinParsear, this.citaActual.horaInicio).subscribe(data => { });
  }

  ngOnDestroy() {

  }

  getCitaCompleta() {
    this.profesorService.getCitaCompleta(this.citaActual.cedulaEst, this.usuarioActual.cedula, this.citaActual.diaSinParsear, this.citaActual.horaInicio)
      .subscribe(data => {
        this.objCitasString = data.result;
        console.log((this.objCitasString[0])["carne"]);
        this.objetoCita.carne = ((this.objCitasString[0])["carne"]);
        this.objetoCita.descripcion = ((this.objCitasString[0])["descr"]);
        this.objetoCita.lugar = ((this.objCitasString[0])["lug"]);
        this.objetoCita.tipo = ((this.objCitasString[0])["pub"]);
        this.objetoCita.contador = ((this.objCitasString[0])["cont"]);
        if (this.objetoCita.tipo == "1") {
          this.objetoCita.tipo = "Publica";
          this.esconderContador=false;
        } else {
          this.objetoCita.tipo = "Privada";
          this.esconderContador=true;
        }


        /* 
           this.objetoCita.carne = this.objCitasString[0][0];//carne
           this.objetoCita.descripcion = this.objCitasString[0][1];//descr
           this.objetoCita.lugar = this.objCitasString[0][2];//lug
           this.objetoCita.tipo = this.objCitasString[0][3];//tipo
           this.objetoCita.contador = this.objCitasString[0][4];//cont
          */
      });






  }


  // 
}

