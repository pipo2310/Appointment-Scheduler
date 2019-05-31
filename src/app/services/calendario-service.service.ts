import { Injectable } from '@angular/core';
import { Profesor } from '../modelo/profesor';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {
  listaProfes: Array<Date> = new Array<Date>();
  listaEstudiantes: Array<Date> = new Array<Date>();

  constructor() { 
    
  }
 

  getListaHorarioCitas(profesor:Profesor){
   return  this.listaProfes;
  }

  getListaHorarioCitas2(profesor:Profesor){
    return  this.listaEstudiantes;
   }
 

}
