import { Component, OnInit, Input } from '@angular/core';
import {
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
import { ApiService } from '../../api.service';

//import {MatDialogModule} from '@angular/material/dialog';
import { CalendarioService } from '../../services/calendario-service.service';
import { viewAttached } from '@angular/core/src/render3/instructions';
import { Slot } from 'src/app/modelo/slot';
import { EventDiaVistaEst, DispCitaPublicaVistaEst, DispProfeVistaEst, CitaVistaEst, CitaPublicaPropiaEstVistaEst, CitaPublicaAjenaEstVistaEst, CitaPrivadaVistaEst } from 'src/app/modelo/eventdiaVistaEst';
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
  profeCita: Profesor;
  estudianteCita: Estudiante;
  eventos: Array<EventDiaVistaEst>;
  listaProfes: Array<Date> = new Array<Date>();
  listaconsultaEstudiantes: Array<Date> = new Array<Date>();


  diaInicio: Date;
  diaFin: Date;

  constructor(private calendarService: CalendarioService, private modalService: NgbModal, private apiservice: ApiService) {
    // Extrae la información del profe guardada en el almacenamiento local por el student service
    let parsed = JSON.parse(localStorage.getItem('ProfeActualCita'));
    // Interpreta al usuario como un profesor
    this.profeCita = {
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

  variablr: DispProfeVistaEst;
  variable2: CitaPrivadaVistaEst;
  variable3: CitaPrivadaVistaEst;
  variable4: CitaPublicaPropiaEstVistaEst;
  variable5: DispCitaPublicaVistaEst;
  variable6: CitaPublicaAjenaEstVistaEst;
  ngOnInit() {
    var date = new Date();
    var primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
    var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.diaInicio = new Date(primerDia.getFullYear(), +primerDia.getMonth(), primerDia.getDate());
    this.diaFin = new Date(primerDia.getFullYear(), +primerDia.getMonth(), ultimoDia.getDate());
    this.listaProfes = this.apiservice.getFechasDisponiblesProfesor(this.profeCita, this.diaInicio, this.diaFin);
    //this.listaEstudiantes= this.apiservice.getDiasAgendadosEstudiante(this.estudianteCita,this.diaInicio,this.diaFin)

    this.recorrefechas();
    this.eventos = new Array<EventDiaVistaEst>();

    this.variablr = new DispProfeVistaEst();
    this.variablr.fecha = new Date(2019, 5, 6);
    this.variablr.horaFin = "8:00 am";
    this.variablr.horaIni = "7:45 am";

    this.variable2 = new CitaPrivadaVistaEst();
    this.variable2.fecha = new Date(2019, 5, 6);
    this.variable2.horaFin = "8:15 am";
    this.variable2.horaIni = "8:00 am";
    this.variable2.aprobada = true;
    this.variable2.propietario = "Dilian"




    this.variable3 = new CitaPrivadaVistaEst();
    this.variable3.fecha = new Date(2019, 5, 6);
    this.variable3.horaFin = "8:30 am";
    this.variable3.horaIni = "8:15 am";
    this.variable3.aprobada = false;
    this.variable3.propietario = "Dilian"

    this.variable4 = new CitaPublicaPropiaEstVistaEst();
    this.variable4.fecha = new Date(2019, 5, 6);
    this.variable4.horaFin = "8:45 am";
    this.variable4.horaIni = "8:30 am";
    this.variable4.aprobada = true;
    this.variable4.propietario = "Dilian"

    this.variable5 = new DispCitaPublicaVistaEst();
    this.variable5.fecha = new Date(2019, 5, 6);
    this.variable5.horaFin = "9:00 am";
    this.variable5.horaIni = "8:45 am";
    this.variable5.propietario = "JIMMY TRABUCO"

    this.variable6 = new CitaPublicaAjenaEstVistaEst();
    this.variable6.fecha = new Date(2019, 5, 6);
    this.variable6.horaFin = "9:15 am";
    this.variable6.horaIni = "9:00 am";
    this.variable6.propietario = "FERNANDO"


    this.eventos.push(this.variablr)
    this.eventos.push(this.variable2);
    this.eventos.push(this.variable3);
    this.eventos.push(this.variable4)
    this.eventos.push(this.variable5);
    this.eventos.push(this.variable6);

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

  tieneEventos() {


  }
  val: Boolean = false;

  closeResult: string;

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  slotActual:DispProfeVistaEst
  formularioDatosCitas(content,slot:DispProfeVistaEst) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-formEstudiante' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.slotActual=slot;
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }, content) {
    const activeModal =this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
   

    return this.val;
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


  recorrefechas(): void {

    for (var i = 0; i < this.listaProfes.length; i++) {
      this.addEvent(this.listaProfes[i]);
    }
    for (var i = 0; i < this.listaconsultaEstudiantes.length; i++) {

      this.addEvent(this.listaconsultaEstudiantes[i]);
    }



  }

  addEvent(fecha: Date): void {

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

  cancelarCitaPrivada(informacioncita: CitaPrivadaVistaEst) {
    this.calendarService.cancelarConsultaPrivada(informacioncita)
  }

  cancelarCitaPublica(citaPublica: CitaPublicaPropiaEstVistaEst) {
    this.calendarService.cancelarConsultaPublica(citaPublica)
  }

  asistirACitaPublica(citaPublica:DispCitaPublicaVistaEst){
    this.calendarService.asistirACitaPublica(citaPublica)
  }

  noAsistirACitaPublica(citaPublica:CitaPublicaAjenaEstVistaEst){
    this.calendarService.noAsistirACitaPublica(citaPublica)

  }

  solicitarCitaEnSlotDisponible(){
   
    let descripcion:string= (<HTMLInputElement>document.getElementById('textDescripcion')).value;
    let espublica:boolean;
    var element = <HTMLInputElement> document.getElementById("SeActivoCheck");
    var isChecked = element.checked;
    if(isChecked){
      espublica=true;
    }else{
      espublica=false;
    }
    
    this.calendarService.infoCitaSolicitada(this.slotActual,descripcion,espublica)
  
    
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
