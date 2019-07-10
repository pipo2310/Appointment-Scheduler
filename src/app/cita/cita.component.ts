import { Component, OnInit, Input } from '@angular/core';
import { Cita } from '../modelo/citasPrueba';
import { ListaProfesorComponent } from '../lista-profesor/lista-profesor.component';
import { CitaVistaProf } from '../modelo/citaVistaProf';
import { ObjetoCita } from '../modelo/objetoCita';
import { ProfesorService } from '../services/profesor.service';
import { Usuario } from '../modelo/usuario';
import { element } from '@angular/core/src/render3';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { saveAs } from 'angular-file-saver'

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
  esconderContador: boolean;
  citasObjetos: Array<ObjetoCita>;
  x: any;
  aceptarCitaSubs: Subscription;
  cancelarCitaSubs: Subscription;
  getCitaCompletaSubs: Subscription;
  nombreArchivo: string = ""

  descargar:string = ""

  listProf: ListaProfesorComponent;

  constructor(private profesorService: ProfesorService, private router: Router) {
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
    //this.objetoCita.fileUrl = "https://filehost-umeeter.s3.amazonaws.com/1562777178324/script.sql"

  }

  ngOnDestroy() {
    try {
      //this.aceptarCitaSubs.unsubscribe();
      this.cancelarCitaSubs.unsubscribe();
      this.getCitaCompletaSubs.unsubscribe();
    } catch (Exception) { }

  }

  //Se acepta la cita detallada
  aceptarCita() {
    //console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHS");
    this.aceptarCitaSubs = this.profesorService.aceptarCita(this.usuarioActual.cedula, this.citaActual.diaSinParsear, this.citaActual.horaInicio).subscribe(data => { });
    //console.log("");
    this.router.navigate(['vistaLista']);
  }
  //Se cancela la cita detallada
  cancelarCita() {
    this.cancelarCitaSubs = this.profesorService.cancelarCita(this.usuarioActual.cedula, this.citaActual.diaSinParsear, this.citaActual.horaInicio).subscribe(data => { });
    this.router.navigate(['vistaLista']);
  }

  getCitaCompleta() {
    this.getCitaCompletaSubs = this.profesorService.getCitaCompleta(this.citaActual.cedulaEst, this.usuarioActual.cedula, this.citaActual.diaSinParsear, this.citaActual.horaInicio)
      .subscribe(data => {
        this.objCitasString = data.result;
        this.objetoCita.carne = ((this.objCitasString[0])["carne"]);
        this.objetoCita.descripcion = ((this.objCitasString[0])["descr"]);
        this.objetoCita.lugar = ((this.objCitasString[0])["lug"]);
        this.objetoCita.tipo = ((this.objCitasString[0])["pub"]);
        this.objetoCita.contador = ((this.objCitasString[0])["cont"]);
        this.objetoCita.fileUrl = ((this.objCitasString[0])["fileUrl"]);
        console.log(this.objetoCita.fileUrl)
        if (this.objetoCita.fileUrl != null) {
          this.profesorService.getArchivoAdjunto(this.objetoCita.fileUrl)
          let splitted = this.objetoCita.fileUrl.split("/")
          this.nombreArchivo = splitted[1]
          console.log("nombre archivo: ", this.nombreArchivo)
        }

        this.descargar = "https://filehost-umeeter.s3.amazonaws.com/" + this.objetoCita.fileUrl

        if (this.objetoCita.tipo == "1") {
          this.objetoCita.tipo = "Publica";
          this.esconderContador = false;
        } else {
          this.objetoCita.tipo = "Privada";
          this.esconderContador = true;
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

  getArchivoAdjunto() {
    //return this.profesorService.getArchivoAdjunto(this.citaActual.fileUrl)
    //this.citaActual.fileUrl = "https://calibre-ebook.com/downloads/demos/demo.docx"
    //console.log(this.citaActual.fileUrl)
    //http://www.africau.edu/images/default/sample.pdf
  }
}

