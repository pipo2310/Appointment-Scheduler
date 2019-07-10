import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfesorService } from '../services/profesor.service';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Profesor } from '../modelo/profesor';
import { Subscription } from 'rxjs';
import { SemanaProf } from '../modelo/semanaProf';
import { CitaVistaProf } from '../modelo/citaVistaProf';
import { element } from '@angular/core/src/render3';




@Component({
  selector: 'app-lista-profesor',
  templateUrl: './lista-profesor.component.html',
  styleUrls: ['./lista-profesor.component.css']
})
export class ListaProfesorComponent implements OnInit, OnDestroy {
  semanas: Array<SemanaProf>;
  semanasString: Object[];
  selectedSemana: SemanaProf;
  citasSemana: Array<CitaVistaProf>;
  citasSemanaString: Object[];
  citaActual: CitaVistaProf;
  getCitasSubs: Subscription;
  logoutSubs:Subscription;
  getSemanasSemestreSubs:Subscription;

  message: string;

  usuarioActual: Profesor;
  

  constructor(private profesorService: ProfesorService, private apiService: ApiService, private router: Router) {
    let parsed = JSON.parse(localStorage.getItem('usuarioActual'));
    // Interpreta al usuario como un profesor
    this.usuarioActual = {
      cedula: parsed['cedula'],
      email: parsed['email'],
      nombre: parsed['nombre'],
      primerApellido: parsed['primerApellido'],
      segundoApellido: parsed['segundoApellido']
    };
    this.semanas = new Array<SemanaProf>();
    this.citasSemana = new Array<CitaVistaProf>();
  }

  ngOnInit() {
    this.getSemanasSemestre();
  }

  ngOnDestroy() {
    try{
      this.getCitasSubs.unsubscribe();
      this.logoutSubs.unsubscribe();
      this.getSemanasSemestreSubs.unsubscribe();
    }catch(Exception ){}
  }
  /*
    newMessage() {
      this.data.changeCita(this.citaActual)
    }
  */
  logout() {
    this.logoutSubs = this.profesorService.conmutarLogueado(this.usuarioActual).subscribe();
    this.router.navigate(['login']);
  }

  rangos() {
    this.router.navigate(['definirRango']);
  }

  onSelect(sem: SemanaProf) {

    //this.citasSemana = [];
    this.selectedSemana = sem;
    this.getCitas(this.selectedSemana);

  }

  getCitas(sem: SemanaProf) {
    this.citasSemana=[];
    let options = { weekday: 'long', month: 'long', day: 'numeric' };
    let diaIng:string;
    let tiempoIni:string;
    let tiempoFin:string;
    let estadoS:string;
    let nombreS:string;

    this.getCitasSubs = this.profesorService.getCitasSemana(this.usuarioActual.cedula, sem.ini.toISOString(), sem.fin.toISOString())
      .subscribe(data => {
        this.citasSemanaString = data;
        this.citasSemanaString.forEach(element => {
          diaIng=(new Date(element["fecha"]).toLocaleDateString("es-ES", options));
          diaIng= diaIng.charAt(0).toUpperCase() + diaIng.slice(1);
          tiempoIni=element["horaIni"];
          tiempoFin=element["horaFin"];
          tiempoIni=tiempoIni.substring(0,tiempoIni.length-3);
          tiempoFin=tiempoFin.substring(0,tiempoFin.length-3);
          estadoS=element["status"];
          if(estadoS=='A'){
            estadoS='Aprobado';
          }else if(estadoS=='R'){
              estadoS='Reservado';
          }
          if (element["cedula"] == null) {
            nombreS = "Sin propietario";
          } else {
            nombreS = element["nombre"]+' '+ element["primerApellido"]+' '+element["segundoApellido"];
          }
          this.citasSemana.push(
            {
              nombre: nombreS,
              cedulaEst: element["cedula"],
              dia : diaIng,             
              //horaInicio: element["horaIni"],
              //horaFinal: element["horaFin"],
              horaInicio:tiempoIni,
              horaFinal:tiempoFin,
              diaSinParsear:element["fecha"],
              //estado: element["status"],
              estado:estadoS,
              siglaCurso: element["siglaCurso"],
              numGrupo: element["numGrupo"],
              fileName: "nombre de archivo",
              fileUrl: "ninguno por ahora"
            }
          );
        })
      });


  }

  irADetalles(cita: CitaVistaProf) {
    //this.router.navigate(['detalleCita']);
    //Parametro o cita se requiere pasar para ver detalles en siguiente pantalla
    this.citaActual = cita;

    localStorage.setItem('citaActual', JSON.stringify(this.citaActual));
  }

  //Se aceptan las citas con el checkbox marcado
  cancelarBloque() {

  }

  //Se cancelan las citas con el checkbox marcado
  aceptarBloque() {

  }

  getCitaActual() {
    return this.citaActual;
  }

  getSemanasSemestre() {
    let diaInicio: string;
    let diaFinal: string;
    let options = { weekday: 'long', month: 'long', day: 'numeric' };
    this.getSemanasSemestreSubs = this.profesorService.getSemanasSemestre().subscribe(data => {
      this.semanasString = data,
        this.semanasString.forEach(element => {
          diaInicio = this.parseISOString((element["ini"])).toLocaleDateString("es-ES", options);
          diaInicio = diaInicio.charAt(0).toUpperCase() + diaInicio.slice(1);
          diaFinal = this.parseISOString((element["fin"])).toLocaleDateString("es-ES", options);
          diaFinal = diaFinal.charAt(0).toUpperCase() + diaFinal.slice(1);
          this.semanas.push(
            {
              diaInicio: diaInicio,
              diaFinal: diaFinal,
              ini: new Date(element["ini"]),
              fin: new Date(element["fin"])
            }
          );
        })
    });
  }
  parseISOString(s: string) {
    let b = s.split(/\D+/);
    return new Date(Number(b[0]), Number(b[1]) - 1, Number(b[2]));
  }

  vistaCalend(){
    this.router.navigate(['homeProfesor']);
  }

  vistaList(){
    this.router.navigate(['vistaLista']);
  }
}
