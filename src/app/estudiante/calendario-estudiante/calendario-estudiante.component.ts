import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { Subject, Subscription, Observable, forkJoin, of } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarView
} from 'angular-calendar';
import { MaxLengthValidator } from '@angular/forms';
import { Profesor } from '../../modelo/profesor';
import { Estudiante } from '../../modelo/estudiante';
import { CalendarService } from '../../services/calendario-service.service';
import { viewAttached, element } from '@angular/core/src/render3/instructions';
import { EventDiaVistaEst, DispCitaPublicaVistaEst, DispProfeVistaEst, CitaPublicaPropiaEstVistaEst, CitaPublicaAjenaEstVistaEst, CitaPrivadaVistaEst } from 'src/app/modelo/eventdiaVistaEst';
import { tap, map } from 'rxjs/operators';

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
  events$: Observable<CalendarEvent[]>;
  profeCita: Profesor;
  estudianteCita: Estudiante;
  eventos: Array<EventDiaVistaEst>;
  conjuntoDias: Set<number>;

  // TODO: borrar 
  // listaDispProf: Array<Date> = new Array<Date>();
  // listaCitasEst: Array<Date> = new Array<Date>();
  
  dat: Array<Date> = new Array<Date>();
  da: Date;
  diaInicio: Date;
  diaFin: Date;
  primerDia: Date;
  ultimoDia: Date;
  eventosObject: Object[];
  diasDispProfeSubs: Subscription;
  eventosDiasProfeSubs: Subscription;
  insertCitaSubs: Subscription;
  asistirACitaPublicaSubs: Subscription;
  noAsistirACitaPublicaSubs: Subscription;
  cancelarCitaPrivadaSubs: Subscription;
  cancelarCitaPublicaSubs: Subscription;
  slotActual: DispProfeVistaEst

  constructor(private calendarService: CalendarService, private modalService: NgbModal) {
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
    this.conjuntoDias = new Set<number>();
    this.eventos = new Array<EventDiaVistaEst>();

    // TODO: Mejorar
    var date = new Date();
    this.primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
    this.dat.push(this.primerDia);
  }

  variablr: DispProfeVistaEst;
  variable2: CitaPrivadaVistaEst;
  variable3: CitaPrivadaVistaEst;
  variable4: CitaPublicaPropiaEstVistaEst;
  variable5: DispCitaPublicaVistaEst;
  variable6: CitaPublicaAjenaEstVistaEst;

  ngOnInit() {
    // TODO: Mejorar
    var date = new Date();
    this.primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
    this.ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.diaInicio = new Date(this.primerDia.getFullYear(), +this.primerDia.getMonth(), this.primerDia.getDate());
    this.diaFin = new Date(this.primerDia.getFullYear(), +this.primerDia.getMonth(), this.ultimoDia.getDate());
    
    this.llenarEvents();
  }

  ngOnDestroy() {
    try {
      this.insertCitaSubs.unsubscribe();
      this.diasDispProfeSubs.unsubscribe();
      this.asistirACitaPublicaSubs.unsubscribe();
      this.noAsistirACitaPublicaSubs.unsubscribe();
      this.cancelarCitaPrivadaSubs.unsubscribe();
      this.cancelarCitaPublicaSubs.unsubscribe();
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

  // TODO: borrar
  // actions: CalendarEventAction[] = [
  //   {
  //     label: '<i class="fa fa-fw fa-pencil"></i>',
  //     onClick: ({ event }: { event: CalendarEvent }): void => {
  //     }
  //   },
  //   {
  //     label: '<i class="fa fa-fw fa-times"></i>',
  //     onClick: ({ event }: { event: CalendarEvent }): void => {
  //       this.events$ = this.events$.filter(iEvent => iEvent !== event);
  //     }
  //   }
  // ];

  refresh: Subject<any> = new Subject();

  activeDayIsOpen: boolean = true;

  // TODO: borrar
  // val: Boolean = false;

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

  private llenarEvents() {
    var arrayDiasCita =
      this.calendarService.getDiasConCitaEst(this.primerDia.toISOString(), this.ultimoDia.toISOString(), this.profeCita.cedula, this.estudianteCita.cedula, localStorage.getItem('sigla'))
        .pipe(
          map(
            results => {
              if (results.length > 0) {
                return results.map(element => {
                  let fecha = new Date(this.parseISOString(element["fecha"]));

                  // TODO: borrar 
                  // this.listaCitasEst.push(fecha);

                  this.conjuntoDias.add(fecha.getTime());
                  return {
                    title: "Cita con el profesor",
                    start: fecha,
                    color: colors.green,
                    allDay: true
                  };
                }
                );
              } else {
                return new Array<CalendarEvent>();
              }
            })
        );

    var arrayDiasDisp =
      this.calendarService.getHorarioDispProfe(this.profeCita.cedula, this.primerDia.toISOString(), this.ultimoDia.toISOString())
        .pipe(
          map(
            results => {
              if (results.length > 0) {
                return results.map(element => {
                  let fecha = new Date(this.parseISOString(element["fecha"]));

                  // TODO: borrar                    
                  // this.listaDispProf.push(fecha);
                  
                  this.conjuntoDias.add(fecha.getTime());
                  return {
                    title: "Disponibilidad del profesor",
                    start: fecha,
                    color: colors.yellow,
                    allDay: true
                  };
                }
                );
              } else {
                return new Array<CalendarEvent>();
              }
            })
        );

    this.events$ = forkJoin(arrayDiasCita, arrayDiasDisp).pipe(
      map(
        arrays => {
          console.log(arrays);
          let arrayTemp: CalendarEvent[] = [];
          arrays.forEach(arr => {
            arr.forEach(elem => {
              arrayTemp.push(elem);
            })
          });
          return arrayTemp;
        }
      )
    );
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
    if (this.conjuntoDias.has(date.getTime())) {
      console.log(date);
      this.diasDispProfeSubs = this.getEventosUnDiaEst(date.toISOString()).subscribe();
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }

    // TODO: borrar 
    // for (let i = 0; i < this.listaDispProf.length; i++) {
    //   if (date.getTime() == this.listaDispProf[i].getTime()) {

    //     this.diasDispProfeSubs = this.getEventosUnDiaEst(date.toISOString()).subscribe(() => {
    //     });

    //     this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    //       this.closeResult = `Closed with: ${result}`;
    //     }, (reason) => {
    //       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    //     });
    //     i = this.listaDispProf.length
    //   }
    // }

    // for (let i = 0; i < this.listaCitasEst.length; i++) {
    //   if (date.getTime() == this.listaCitasEst[i].getTime()) {
    //     this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    //       this.closeResult = `Closed with: ${result}`;
    //     }, (reason) => {
    //       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    //     });
    //     i = this.listaCitasEst.length
    //   }
    // }
    // return this.val;
  }

  asistirACitaPublica(slot: DispCitaPublicaVistaEst) {
    this.asistirACitaPublicaSubs = this.calendarService.asistirACitaPublica(slot, this.profeCita.cedula, this.estudianteCita.cedula).subscribe();
    window.alert("hecho");
  }

  noAsistirACitaPublica(slot: DispCitaPublicaVistaEst) {
    this.noAsistirACitaPublicaSubs = this.calendarService.noAsistirACitaPublica(slot, this.profeCita.cedula, this.estudianteCita.cedula).subscribe();
    window.alert("hecho no asiste");
  }

  cancelarCitaPrivada(slot: CitaPrivadaVistaEst) {
    this.cancelarCitaPrivadaSubs = this.calendarService.cancelarConsultaPrivada(slot, this.profeCita.cedula, this.estudianteCita.cedula).subscribe();
    window.alert("cancelada");
  }

  solicitarCitaEnSlotDisponible(descripcion: string, publica: boolean) {
    let n = -1;
    if (publica) {
      n = 1;
    } else {
      n = 0;
    }
    this.insertCitaSubs = this.calendarService.insertarCita(this.estudianteCita.cedula, this.profeCita.cedula, localStorage.getItem('sigla'), this.slotActual.fecha.toISOString(), this.slotActual.horaIni, descripcion, n).subscribe();
    window.alert("insertado");
  }

  cancelarCitaPublica(slot: CitaPublicaPropiaEstVistaEst) {
    this.cancelarCitaPrivadaSubs = this.calendarService.cancelarConsultaPublica(slot, this.profeCita.cedula, this.estudianteCita.cedula).subscribe();
    window.alert("cancelada");
  }

  getEventosUnDiaEst(fecha: string): Observable<any> {
    this.eventos = [];
    return this.calendarService.getEventosEst(this.estudianteCita.cedula, fecha, this.profeCita.cedula, localStorage.getItem('sigla'))
      .pipe(tap(data => {
        this.eventosObject = data,
          this.eventosObject['result'].forEach(element => {
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
                  dispCitaPublicaVistaEst.propietario = element['nombreEstPropCita'] + " " + element['primerApellidoEstPropCita'] + " " + element['segundoApellidoEstPropCita'] + " ";
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
                citaPrivadaVistaEst.propietario = element['nombreEstPropCita'] + " " + element['primerApellidoEstPropCita'] + " " + element['segundoApellidoEstPropCita'] + " ";
                citaPrivadaVistaEst.estado = element['statusCita'];
                this.eventos.push(citaPrivadaVistaEst);
                break;
              case 3:
                let citaPublicaPropiaEstVistaEst = new CitaPublicaPropiaEstVistaEst();
                citaPublicaPropiaEstVistaEst.fecha = this.parseISOString(fecha);
                citaPublicaPropiaEstVistaEst.horaIni = element['horaIni'];
                citaPublicaPropiaEstVistaEst.horaFin = element['horaFin'];
                citaPublicaPropiaEstVistaEst.descripcion = element['descripcion'];
                citaPublicaPropiaEstVistaEst.propietario = element['nombreEstPropCita'] + " " + element['primerApellidoEstPropCita'] + " " + element['segundoApellidoEstPropCita'] + " ";
                citaPublicaPropiaEstVistaEst.estado = element['statusCita'];
                this.eventos.push(citaPublicaPropiaEstVistaEst);
                break;
              case 4:
                let citaPublicaAjenaEstVistaEst = new CitaPublicaAjenaEstVistaEst();
                citaPublicaAjenaEstVistaEst.fecha = this.parseISOString(fecha);
                citaPublicaAjenaEstVistaEst.horaIni = element['horaIni'];
                citaPublicaAjenaEstVistaEst.horaFin = element['horaFin'];
                citaPublicaAjenaEstVistaEst.descripcion = element['descripcion'];
                citaPublicaAjenaEstVistaEst.propietario = element['nombreEstPropCita'] + " " + element['primerApellidoEstPropCita'] + " " + element['segundoApellidoEstPropCita'] + " ";
                citaPublicaAjenaEstVistaEst.estado = element['statusCita'];
                this.eventos.push(citaPublicaAjenaEstVistaEst);
                break;
            }
          })
      }));
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
}
