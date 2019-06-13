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
import { viewAttached, element } from '@angular/core/src/render3/instructions';
import { Slot } from 'src/app/modelo/slot';
import { EventDiaVistaEst, DispCitaPublicaVistaEst, DispProfeVistaEst, CitaVistaEst, CitaPublicaPropiaEstVistaEst, CitaPublicaAjenaEstVistaEst, CitaPrivadaVistaEst } from 'src/app/modelo/eventdiaVistaEst';
import { promise } from 'protractor';
//import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { tap, timeout, takeWhile } from 'rxjs/operators';
import { async } from 'q';
import { strictEqual } from 'assert';
import { stringify } from '@angular/compiler/src/util';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Router } from '@angular/router';
import { renderComponent } from '@angular/core/src/render3';

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
  eventos: Array<EventDiaVistaEst> = new Array<EventDiaVistaEst>();
  listaDispProf: Array<Date> = new Array<Date>();
  listaEstudiantes: Array<Date> = new Array<Date>();
  dat: Array<Date> = new Array<Date>();
  da: Date;
  diaInicio: Date;
  diaFin: Date;
  primerDia: Date;
  ultimoDia: Date;
  fechasString: Object[];
  eventsObject: Object[];
  horarioDispProfeSubs: Subscription;
  insertCitaSubs: Subscription;
  loaded: Promise<boolean>;
  slotActual: DispProfeVistaEst

  constructor(private calendarService: CalendarService, private modalService: NgbModal) {
    this.loaded = Promise.resolve(true);
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

  async ngOnInit() {
    this.loaded = Promise.resolve(false);
    var date = new Date();
    this.primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
    this.ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.diaInicio = new Date(this.primerDia.getFullYear(), +this.primerDia.getMonth(), this.primerDia.getDate());
    this.diaFin = new Date(this.primerDia.getFullYear(), +this.primerDia.getMonth(), this.ultimoDia.getDate());

    this.horarioDispProfeSubs = await this.getDiasConCitasEst().subscribe();
    await this.recorrefechas();
  }

  ngOnDestroy() {
    try {
      this.insertCitaSubs.unsubscribe();
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

  formularioDatosCitas(content, slot: DispProfeVistaEst) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-formEstudiante' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.slotActual = slot;
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }, content) {
    for (let i = 0; i < this.listaDispProf.length; i++) {
      if (date.getTime() == this.listaDispProf[i].getTime()) {
        this.horarioDispProfeSubs = this.getEventosUnDiaEst(date.toISOString()).subscribe(() => {
        });
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
        i = this.listaDispProf.length
      }
    }
    for (let i = 0; i < this.listaEstudiantes.length; i++) {
      if (date.getTime() == this.listaEstudiantes[i].getTime()) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
        i = this.listaEstudiantes.length
      }
    }
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
  asistirACitaPublica(slot: DispCitaPublicaVistaEst) {
    this.calendarService.asistirACitaPublica(slot, this.profeCita.cedula, this.estudianteCita.cedula).subscribe();
    window.alert("hecho");
    //this.recorrefechas();
  }

  noAsistirACitaPublica(slot: DispCitaPublicaVistaEst) {
    this.calendarService.noAsistirACitaPublica(slot, this.profeCita.cedula, this.estudianteCita.cedula).subscribe();
    window.alert("hecho no asiste");
    //this.recorrefechas();
  }

  cancelarCitaPrivada(slot: CitaPrivadaVistaEst) {
    this.calendarService.cancelarConsultaPrivada(slot, this.profeCita.cedula, this.estudianteCita.cedula).subscribe();
    window.alert("cancelada");
  }

  solicitarCitaEnSlotDisponible() {
   this.insertCitaSubs =  this.calendarService.insertarCita(this.estudianteCita.cedula, this.profeCita.cedula, localStorage.getItem('sigla'), '2019-06-11', '10:30:00', "descripcion", 0).subscribe();
  }

  cancelarCitaPublica(slot: CitaPublicaPropiaEstVistaEst){
    this.calendarService.cancelarConsultaPublica(slot, this.profeCita.cedula, this.estudianteCita.cedula).subscribe();
    window.alert("cancelada");
  }

  getHorarioDispProfe() {
    return this.calendarService.getHorarioDispProfe(this.profeCita.cedula, this.primerDia.toISOString(), this.ultimoDia.toISOString())
      .pipe(tap(data => {
        this.fechasString = data,
          this.fechasString.forEach(element => {
            this.listaDispProf.push(new Date(this.parseISOString(element["fecha"])));
          })
      }));
  }

  getDiasConCitasEst() {
    let diasCitaObject: Object[];
    return this.calendarService.getDiasConCitaEst(this.primerDia.toISOString(), this.ultimoDia.toISOString(), this.profeCita.cedula, this.estudianteCita.cedula, localStorage.getItem('sigla'))
      .pipe(tap(data => {
        diasCitaObject = data,
          diasCitaObject['result'].forEach(element => {
            this.listaEstudiantes.push(new Date(this.parseISOString(element['fecha'])));
          })
      }));
  }

  getEventosUnDiaEst(fecha: string): Observable<any> {
    this.eventos = [];
    return this.calendarService.getEventosEst(this.estudianteCita.cedula, fecha, this.profeCita.cedula, localStorage.getItem('sigla'))
      .pipe(tap(data => {
        this.eventsObject = data,
          this.eventsObject['result'].forEach(element => {
            switch (element['tipoEvento']) {
              case 0:
                let dispProfeVistaEst = new DispProfeVistaEst();
                dispProfeVistaEst.fecha = this.parseISOString(fecha);
                dispProfeVistaEst.horaIni = element['horaIni'];
                dispProfeVistaEst.horaFin = element['horaFin'];
                this.eventos.push(dispProfeVistaEst);
                break;

              case 1:
                let dispCitaPublicaVistaEst = new DispCitaPublicaVistaEst();
                dispCitaPublicaVistaEst.fecha = this.parseISOString(fecha);
                dispCitaPublicaVistaEst.horaIni = element['horaIni'];
                dispCitaPublicaVistaEst.horaFin = element['horaFin'];
                dispCitaPublicaVistaEst.descripcion = element['descripcion'];
                if (element['idEstPropCita'] != null) {
                  dispCitaPublicaVistaEst.propietario = element['nombreEstPropCita'] + element['primerApellidoEstPropCita'] + element['segundoApellidoEstPropCita'];
                } else {
                  dispCitaPublicaVistaEst.propietario = "Sin propietario"
                }
                dispCitaPublicaVistaEst.estado = element['statusCita'];
                this.eventos.push(dispCitaPublicaVistaEst);
                break;
              case 2:
                let citaPrivadaVistaEst = new CitaPrivadaVistaEst();
                citaPrivadaVistaEst.fecha = this.parseISOString(fecha);
                citaPrivadaVistaEst.horaIni = element['horaIni'];
                citaPrivadaVistaEst.horaFin = element['horaFin'];
                citaPrivadaVistaEst.descripcion = element['descripcion'];
                citaPrivadaVistaEst.propietario = element['nombreEstPropCita'] + element['primerApellidoEstPropCita'] + " " + element['segundoApellidoEstPropCita'];
                citaPrivadaVistaEst.estado = element['statusCita'];
                this.eventos.push(citaPrivadaVistaEst);
                break;
              case 3:
                let citaPublicaPropiaEstVistaEst = new CitaPublicaPropiaEstVistaEst();
                citaPublicaPropiaEstVistaEst.fecha = this.parseISOString(fecha);
                citaPublicaPropiaEstVistaEst.horaIni = element['horaIni'];
                citaPublicaPropiaEstVistaEst.horaFin = element['horaFin'];
                citaPublicaPropiaEstVistaEst.descripcion = element['descripcion'];
                citaPublicaPropiaEstVistaEst.propietario = element['nombreEstPropCita'] + element['primerApellidoEstPropCita'] + " " + element['segundoApellidoEstPropCita'];
                citaPublicaPropiaEstVistaEst.estado = element['statusCita'];
                this.eventos.push(citaPublicaPropiaEstVistaEst);
                break;
              case 4:
                let citaPublicaAjenaEstVistaEst = new CitaPublicaAjenaEstVistaEst();
                citaPublicaAjenaEstVistaEst.fecha = this.parseISOString(fecha);
                citaPublicaAjenaEstVistaEst.horaIni = element['horaIni'];
                citaPublicaAjenaEstVistaEst.horaFin = element['horaFin'];
                citaPublicaAjenaEstVistaEst.descripcion = element['descripcion'];
                citaPublicaAjenaEstVistaEst.propietario = element['nombreEstPropCita'] + element['primerApellidoEstPropCita'] + " " + element['segundoApellidoEstPropCita'];
                citaPublicaAjenaEstVistaEst.estado = element['statusCita'];
                this.eventos.push(citaPublicaAjenaEstVistaEst);
                break;
            }
          })
      }));
  }

  recorrefechas() {
    this.horarioDispProfeSubs = this.getHorarioDispProfe()
      .subscribe(() => {
        this.listaDispProf.forEach(element => {
          this.addEvent(element);
        });

        for (var i = 0; i < this.listaEstudiantes.length; i++) {
          this.addEventEstudiantes(this.listaEstudiantes[i]);
        }
      });
    this.loaded = Promise.resolve(true);
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

  addEventEstudiantes(fecha: Date): void {
    this.events = [
      ...this.events,
      {
        // background-color:red,
        title: 'New event',
        start: startOfDay(fecha),
        color: colors.green,
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
    return new Date(Number(b[0]), Number(b[1]) - 1, Number(b[2]));
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}