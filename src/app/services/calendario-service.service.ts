import { Injectable } from '@angular/core';
import { Profesor } from '../modelo/profesor';
import { CitaPrivadaVistaEst, CitaPublicaPropiaEstVistaEst, CitaPublicaAjenaEstVistaEst, DispCitaPublicaVistaEst, DispProfeVistaEst } from '../modelo/eventdiaVistaEst';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {
  listaProfes: Array<Date> = new Array<Date>();
  listaEstudiantes: Array<Date> = new Array<Date>();

  constructor() { 
    
  }
 
  cancelarConsultaPrivada(informacionCita:CitaPrivadaVistaEst){
   window.alert('llego1');
  }

  cancelarConsultaPublica(citaPublica:CitaPublicaPropiaEstVistaEst){
    window.alert('llego2');
  }


  asistirACitaPublica(citaPublica:DispCitaPublicaVistaEst){
    window.alert('llego3');
  }

  noAsistirACitaPublica(citaPublica:CitaPublicaAjenaEstVistaEst){
    window.alert('llego4');
  }

 infoCitaSolicitada(info:DispProfeVistaEst,descripcion:String,espublica:Boolean){
 
    window.alert(info.horaFin+espublica+descripcion);
  }







  getListaHorarioCitas(profesor:Profesor){
   return  this.listaProfes;
  }

  getListaHorarioCitas2(profesor:Profesor){
    return  this.listaEstudiantes;
   }
 

}
