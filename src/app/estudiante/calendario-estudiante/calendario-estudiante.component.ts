import { Component, OnInit, Input, OnDestroy } from '@angular/core';
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
import { Subject, Subscription, Observable } from 'rxjs';
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
import { CalendarService } from '../../services/calendario-service.service';
import { viewAttached } from '@angular/core/src/render3/instructions';
import { Slot } from 'src/app/modelo/slot';
import { EventDiaVistaEst, DispCitaPublicaVistaEst, DispProfeVistaEst, CitaVistaEst, CitaPublicaPropiaEstVistaEst, CitaPublicaAjenaEstVistaEst, CitaPrivadaVistaEst } from 'src/app/modelo/eventdiaVistaEst';
import { promise } from 'protractor';
//import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { tap } from 'rxjs/operators';

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


export class CalendarioEstudianteComponent implements OnInit, OnDestroy {

  profeCita: Profesor;
  estudianteCita: Estudiante;
  eventos: Array<EventDiaVistaEst>;
  listaDispProf: Array<Date> = new Array<Date>();
  listaEstudiantes: Array<Date> = new Array<Date>();
  dat: Array<Date> = new Array<Date>();
  da: Date;
  diaInicio: Date;
  diaFin: Date;
  primerDia: Date;
  ultimoDia: Date;
  fechasString: Object[];
  horarioDispProfeSubs: Subscription;

  constructor(private calendarService: CalendarService, private modalService: NgbModal) {

    //this.fechas = new Date[0]();
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
    var date = new Date();
    this.primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
    this.dat.push(this.primerDia);

    //Llamar ambos metodos del servicio aqui
    //this.listaProfes = calendarService.getListaHorarioCitasProf(this.profeCita, "2019-06-01 00:00:00","2019-06-30 00:00:00" );
    //let horario = calendarService.getListaHorarioCitasProf(this.profeCita, "2019-06-01 00:00:00","2019-06-30 00:00:00" );
    //this.listaEstudiantes = 


  }


  variablr: DispProfeVistaEst;
  variable2: CitaPrivadaVistaEst;
  variable3: CitaPrivadaVistaEst;
  variable4: CitaPublicaPropiaEstVistaEst;
  variable5: DispCitaPublicaVistaEst;
  variable6: CitaPublicaAjenaEstVistaEst;

  ngOnInit() {
    /*var date = new Date();
    this.primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
    //console.log("primerdia", this.primerDia.toISOString());
    this.ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    //console.log("ultimoDIA", this.ultimoDia.toISOString());
    this.diaInicio = new Date(this.primerDia.getFullYear(), +this.primerDia.getMonth(), this.primerDia.getDate());
    this.diaFin = new Date(this.primerDia.getFullYear(), +this.primerDia.getMonth(), this.ultimoDia.getDate());
    //this.getHorarioDispProfe();
    //this.listaProfes=getFechasDisponiblesProfesor(this.profeCita,diaInicio,diaFin);
    //this.listaEstudiantes= getDiasAgendadosEstudiante(this.profeCita,diaInicio,diaFin)
    //this.recorrefechas();*/

    var date = new Date();
    this.primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
    //console.log("primerdia", this.primerDia.toISOString());
    this.ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    //console.log("ultimoDIA", this.ultimoDia.toISOString());
    this.diaInicio = new Date(this.primerDia.getFullYear(), +this.primerDia.getMonth(), this.primerDia.getDate());
    this.diaFin = new Date(this.primerDia.getFullYear(), +this.primerDia.getMonth(), this.ultimoDia.getDate());

    //this.getHorarioDispProfe();
    this.recorrefechas();
  }

  ngOnDestroy() {
    try {
      this.horarioDispProfeSubs.unsubscribe();
    } catch (Exception) { }

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

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }, content) {
    for (var i = 0; i < this.dat.length; i++) {
      if (date == this.dat[i]) {
        this.val = true;
        return this.val;
      }
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    //this.slotActual = slot;

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

  getHorarioDispProfe(): Observable<any> {
    return this.calendarService.getHorarioDispProfe(this.profeCita.cedula, this.primerDia.toISOString(), this.ultimoDia.toISOString())
      .pipe(tap(data => {
        this.fechasString = data,
          this.fechasString.forEach(element => {
            this.listaDispProf.push(new Date(element["fecha"]));
          })
        console.log("horario del profe en días", this.listaDispProf.length);
      }));
    //this.listaDispProf = this.fechas;*/ 
  }

  recorrefechas() {
    //this.delay(1500);
    this.getHorarioDispProfe().subscribe(()=>{
      for (var i = 0; i < this.listaDispProf.length; i++) {
        this.addEvent(this.listaDispProf[i]);
      }
    });
    /*console.log("tamaño", this.listaDispProf.length);
    

    for (var i = 0; i < this.dat.length; i++) {
      this.addEvent(this.dat[i]);
    }*/

    //this.calendarService.infoCitaSolicitada(this.slotActual,"descripcion",true);

    //this.addEvent(this.listaDispProf[i]);
  }

  addEvent(fecha: Date): void {
    console.log("add events: ", fecha);
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


  parseISOString(s: string) {
    let b = s.split(/\D+/);
    return new Date(Number(b[0]), Number(b[1]) - 1, Number(b[2] + 1));
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
