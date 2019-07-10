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
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { SendEmailService } from '../services/send-email.service';

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
  confirmacion:boolean;

  listProf: ListaProfesorComponent;

  constructor(private profesorService: ProfesorService,private router:Router,private confirmationDialogService: ConfirmationDialogService,private envEmail: SendEmailService) {
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
    this.confirmacion=false;

    this.objetoCita = new ObjetoCita;
    this.getCitaCompleta();


    //this.citaMostrar = this.listProf.getCitaActual();

  }


  ngOnInit() {

  }

  ngOnDestroy() {
    try {
      //this.aceptarCitaSubs.unsubscribe();
      //this.cancelarCitaSubs.unsubscribe();
      //this.getCitaCompletaSubs.unsubscribe();
    } catch (Exception) { }

  }

  //Se acepta la cita detallada
  aceptarCita() {
    //console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHS");
    let options = { weekday: 'long', month: 'long', day: 'numeric' };
    this.aceptarCitaSubs = this.profesorService.aceptarCita(this.usuarioActual.cedula, this.citaActual.diaSinParsear, this.citaActual.horaInicio).subscribe(data => { });
    //console.log("");
    window.alert("cita aceptada");
    this.router.navigate(['vistaLista']);
    //this.aceptarCitaSubs = this.profesorService.aceptarCita(this.usuarioActual.cedula, this.citaActual.diaSinParsear, this.citaActual.horaInicio).subscribe(data => { });
    let nom: string;
    console.log(this.objetoCita)
    
    nom = 'Estimado ' + this.citaActual.nombre + ' su cita ha sido aceptada ';
    console.log(nom);
    console.log((new Date(this.citaActual.diaSinParsear)).toLocaleDateString("es-ES", options));
    console.log(this.usuarioActual.nombre);
    console.log(this.citaActual.horaInicio);
    console.log(this.objetoCita.email);
    this.envEmail.enviarEmail(nom, this.objetoCita.email, (new Date(this.citaActual.diaSinParsear)).toLocaleDateString("es-ES", options), this.usuarioActual.nombre, this.citaActual.horaInicio).subscribe();

  }
  //Se cancela la cita detallada
  cancelarCita() {
    this.confirmationDialogService.confirm('Favor confirmar', 'Realmente quieres rechazar la peticion?')
    .then((confirmed) => this.cancelarConf(confirmed))
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    //console.log(this.confirmacion);
    
    
  }
  cancelarConf(conf:boolean){
    let options = { weekday: 'long', month: 'long', day: 'numeric' };
    console.log(conf);
    if (conf==true){
      this.cancelarCitaSubs = this.profesorService.cancelarCita(this.usuarioActual.cedula, this.citaActual.diaSinParsear, this.citaActual.horaInicio).subscribe(data => { });
      window.alert("cita cancelada");
      this.router.navigate(['vistaLista']);
      this.aceptarCitaSubs = this.profesorService.aceptarCita(this.usuarioActual.cedula, this.citaActual.diaSinParsear, this.citaActual.horaInicio).subscribe(data => { });
    let nom: string;
    nom = 'Estimado ' + this.citaActual.nombre + ' su cita ha sido rechazada ';
    this.envEmail.enviarEmail(nom, this.objetoCita.email, (new Date(this.citaActual.diaSinParsear)).toLocaleDateString("es-ES", options), this.usuarioActual.nombre, this.citaActual.horaInicio).subscribe();
      
    }

  }

  getCitaCompleta() {
    this.getCitaCompletaSubs = this.profesorService.getCitaCompleta(this.citaActual.cedulaEst, this.usuarioActual.cedula, this.citaActual.diaSinParsear, this.citaActual.horaInicio)
      .subscribe(data => {
        this.objCitasString = data.result;
        console.log(data.result);
        this.objetoCita.carne = ((this.objCitasString[0])["carne"]);
        this.objetoCita.descripcion = ((this.objCitasString[0])["descr"]);
        this.objetoCita.lugar = ((this.objCitasString[0])["lug"]);
        this.objetoCita.tipo = ((this.objCitasString[0])["pub"]);
        this.objetoCita.contador = ((this.objCitasString[0])["cont"]);
        this.objetoCita.email = ((this.objCitasString[0])["email"]);
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


  // 
}

