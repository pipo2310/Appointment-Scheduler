import { Component, OnInit, Input } from '@angular/core';
import { Cita } from '../modelo/citasPrueba';
import { ListaProfesorComponent } from '../lista-profesor/lista-profesor.component';
import { CitaVistaProf } from '../modelo/citaVistaProf';
import { ObjetoCita } from '../modelo/objetoCita';
import { ProfesorService } from '../services/profesor.service';
import { Usuario } from '../modelo/usuario';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css']
})
export class CitaComponent implements OnInit {
  citaActual: CitaVistaProf; //Viene de la otra pantalla
  objetoCita: ObjetoCita;
  message: string;
  estado: boolean;
  usuarioActual: Usuario

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
    if (this.citaActual.estado = 'Aprobado') {
      this.estado = true;
    } else {
      this.estado = false;
    }
    this.getCitaCompleta();


    //this.citaMostrar = this.listProf.getCitaActual();

  }


  ngOnInit() {

  }

  //Se acepta la cita detallada
  aceptarCita() {
    this.profesorService.aceptarCita(this.usuarioActual.cedula,this.citaActual.diaSinParsear,this.citaActual.horaInicio).subscribe(data => {});

  }
  //Se cancela la cita detallada
  rechazarCita() {
    this.profesorService.rechazarCita(this.usuarioActual.cedula,this.citaActual.diaSinParsear,this.citaActual.horaInicio).subscribe(data => {});
  }

  ngOnDestroy() {

  }

  getCitaCompleta() {
    this.profesorService.getCitaCompleta(this.citaActual.cedulaEst, this.usuarioActual.cedula, this.citaActual.diaSinParsear, this.citaActual.horaInicio)
    .subscribe(data => {})
    ;
  }
}
