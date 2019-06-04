import { Component, OnInit,Input } from '@angular/core';
import {
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef
} from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { MaxLengthValidator } from '@angular/forms';
import { Profesor } from '../../modelo/profesor';
import { Estudiante } from '../../modelo/estudiante';
//import {MatDialogModule} from '@angular/material/dialog';
import{CalendarioService} from '../../services/calendario-service.service';
import { viewAttached } from '@angular/core/src/render3/instructions';
//import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};
@Component({
  selector: 'app-calendario-estudiante',
  templateUrl: './calendario-estudiante.component.html',
  styleUrls: ['./calendario-estudiante.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  
  
})



export class CalendarioEstudianteComponent implements OnInit {
  profeCita:Profesor;
  estudianteCita: Estudiante;

  listaProfes: Array<Date> = new Array<Date>();
  listaEstudiantes: Array<Date> = new Array<Date>();
  dat: Array<Date> = new Array<Date>();
  da:Date;
  diaInicio:Date;
  diaFin:Date;
      
  constructor( private calendarService: CalendarioService,private modalService: NgbModal) { 
    // Extrae la información del profe guardada en el almacenamiento local por el student service
    let parsed = JSON.parse(localStorage.getItem('ProfeActualCita'));
    // Interpreta al usuario como un profesor
    this. profeCita = {
      cedula: parsed['cedula'],
      email: parsed['email'],
      nombre: parsed['nombre'],
      primerApellido: parsed['primerApellido'],
      segundoApellido: parsed['segundoApellido'],
    };
    // Extrae la información del usuario guardada en el almacenamiento local por el login service
    parsed = JSON.parse(localStorage.getItem('usuarioActual'));
    // Interpreta al usuario como un estudiante
    this.estudianteCita = {
      cedula: parsed['cedula'],
      email: parsed['email'],
      nombre: parsed['nombre'],
      primerApellido: parsed['primerApellido'],
      segundoApellido: parsed['segundoApellido'],
      carne: parsed['carne']
    };


    //Llamar ambos metodos del servicio aqui
   // this.listaProfes = 
    //this.listaEstudiantes = 

    
  }
 
//  constructor(private modal: NgbModal) { }

  ngOnInit() {
   
    this.da = new Date(2019, 4, 31);
    this.dat.push(this.da);
    this.da = new Date(2019, 4, 30);
    this.dat.push(this.da);
    this.da = new Date(2019, 5, 3);
    this.dat.push(this.da);
    
    var date = new Date();
    var primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
    var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.diaInicio = new Date(primerDia.getFullYear(), +primerDia.getMonth(), primerDia.getDate());
    this.diaFin = new Date(primerDia.getFullYear(), +primerDia.getMonth(), ultimoDia.getDate());
      //this.listaProfes=getFechasDisponiblesProfesor(this.profeCita,diaInicio,diaFin);
      //this.listaEstudiantes= getDiasAgendadosEstudiante(this.profeCita,diaInicio,diaFin)

  }
  
  
   @ViewChild('modalContent') modalContent: TemplateRef<any>;
 
   view: CalendarView = CalendarView.Month;
 
   CalendarView = CalendarView;
   
 
   viewDate: Date = new Date();
 
   modalData: {
     action: string;
     event: CalendarEvent;
   };
 
   actions: CalendarEventAction[] = [
     {
       label: '<i class="fa fa-fw fa-pencil"></i>',
       onClick: ({ event }: { event: CalendarEvent }): void => {
        // this.handleEvent('Edited', event);
       }
     },
     {
       label: '<i class="fa fa-fw fa-times"></i>',
       onClick: ({ event }: { event: CalendarEvent }): void => {
         this.events = this.events.filter(iEvent => iEvent !== event);
        // this.handleEvent('Deleted', event);
       }
     }
   ];
 
   refresh: Subject<any> = new Subject();
 
   events: CalendarEvent[] = [
  
     
   ];
 
   activeDayIsOpen: boolean = true;
 
   tieneEventos(){

  
   }
   val:Boolean=false;

   closeResult: string;

   private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
   
   dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }, content){
    for(var i=0;i<this.dat.length;i++){
      if(date==this.dat[i]){
        this.val=true;
       return this.val;
      }}
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });



return this.val;









     /*if (isSameMonth(date, this.viewDate)) {
       this.viewDate = date;
       if (
         (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
         events.length === 0
       ) {
         this.activeDayIsOpen = false;
       } else {
         this.activeDayIsOpen = true;
       }
     }*/
   }
 
   eventTimesChanged({
     event,
     newStart,
     newEnd
   }: CalendarEventTimesChangedEvent): void {
     this.events = this.events.map(iEvent => {
       if (iEvent === event) {
         return {
           ...event,
           start: newStart,
           end: newEnd
         };
       }
       return iEvent;
     });
    // this.handleEvent('Dropped or resized', event);
   }
 
 /*  handleEvent(action: string, event: CalendarEvent): void {
     this.modalData = { event, action };
     this.modal.open(this.modalContent, { size: 'lg' });
   }*/
  
 
 recorrefechas():void{
  
   for(var i = 0; i <this.listaProfes.length; i++){
  
   this.addEvent(this.listaProfes[i]);
   }
   for(var i = 0; i <this.dat.length; i++){
  
    this.addEvent(this.dat[i]);
    }
   for(var i = 0; i <this.listaProfes.length; i++){
  
    this.addEvent(this.listaProfes[i]);
    }



 }
 
   addEvent(fecha:Date): void {
     
     this.events = [
       ...this.events,
       {
       // background-color:red,
         title: 'New event',
         start: startOfDay(fecha),
         color: colors.red,
         draggable: true,
         resizable: {
           beforeStart: true,
           afterEnd: true
         }
       }
     ];
   }
  
 
   deleteEvent(eventToDelete: CalendarEvent) {
     this.events = this.events.filter(event => event !== eventToDelete);
   }
 
   setView(view: CalendarView) {
     this.view = view;
     
   }
 
   closeOpenMonthViewDay() {
     this.activeDayIsOpen = false;
   }
 
 

}
