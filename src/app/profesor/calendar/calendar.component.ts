import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef} from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours} from 'date-fns';
import { Subject, Observable, Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent,
   CalendarEventAction, 
   CalendarEventTimesChangedEvent, 
   CalendarView,
   CalendarMonthViewBeforeRenderEvent,
  CalendarWeekViewBeforeRenderEvent,
  CalendarDayViewBeforeRenderEvent} from 'angular-calendar';
import { startTimeRange } from '@angular/core/src/profile/wtf_impl';
import {CalendarioProfesorService} from '../../services/calendario-profesor.service';
import { CitaVistaProf } from 'src/app/modelo/citaVistaProf';
import { Profesor } from 'src/app/modelo/profesor';
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
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {

  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  mostrar: boolean = true;
  slots: string [];
  citasProfSubs: Subscription;
  horarioProfeSubs: Subscription; /*horarioDispProfeSubs */
  citasDia: Array<CitaVistaProf>;
  citasDiaObject: Object[]; 
  profesorActual: Profesor;
  profeCita: Profesor;
  primerDia: Date;
  ultimoDia: Date;
  loaded: Promise<boolean>;
  listaFechas: Array<Date> = new Array<Date>();
  // Esto es lo que se va a ingresar el el modal
  modalData: {
      action: string,
      event: CalendarEvent,
  };

  

  // ***************************************************************************************************/

constructor(private modal: NgbModal, private calendarioService: CalendarioProfesorService) {

  // Extrae la información del usuario guardada en el almacenamiento local por el login service

  let parsed = JSON.parse(localStorage.getItem('usuarioActual'));

  // Interpreta al usuario como un profesor

  this.profesorActual = {
    cedula : parsed['cedula'],
    email : parsed['email'],
    nombre : parsed['nombre'],
    primerApellido : parsed['primerApellido'],
    segundoApellido : parsed['segundoApellido']

  };
  var date = new Date();
  
  
  this.slots = ["cita1", "cita2", "cita3"];
  

}

// ************************************************************************************************** */

beforeMonthViewRender(renderEvent: CalendarMonthViewBeforeRenderEvent): void {
  renderEvent.body.forEach(day => {
    //const dayOfMonth = day.date.getDate();
    const dayOfMonth = 1;
    if (day.day.valueOf() === dayOfMonth && day.inMonth) {
      day.cssClass='bn-pink';
    }
  });
}

// ************************************************************************************************** */

mostraOpcion():boolean{
return this.mostrar;
}

  /***************************************************************************************************/

  // Este método va relacionado a cuando se hace click en un día y se sepliega hacia abajo la lista de eventos
dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
  this.citasDia = [];
  this.getCitasDia(date).subscribe(()=>{

  });
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0 )
      {
        this.activeDayIsOpen = false;
      } else
      {
        //this.activeDayIsOpen = true;
        this.modal.open(this.modalContent, { size: 'lg' });
      }
    }
  }

  /***************************************************************************************************/

  async ngOnInit() {
  this.citasProfSubs = await this.getDiasConCita().subscribe();
  var date = new Date();
  this.citasDia = new Array<CitaVistaProf>();
  this.primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
  this.ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  this.horarioProfeSubs = await this.getDiasConCita().subscribe();
    await this.recorrefechas();

  }
  getDiasConCita() {
    let diasCitaObject: Object[];
    return this.calendarioService.getDiasConCita(this.primerDia.toISOString(), this.ultimoDia.toISOString(), this.profeCita.cedula)
      .pipe(tap(data => {
        diasCitaObject = data,
          diasCitaObject['result'].forEach(element => {
            this.listaFechas.push(new Date(this.parseISOString(element['fecha'])));
          })
      }));
  }


  /***************************************************************************************************/

actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  /***************************************************************************************************/

refresh: Subject<any> = new Subject();


  //La variable events corresponede a las bolitas o eventos que hay en cada día, en este caso hay de 4 tipos posibles
  // En este vector deben estar todos los eventos que vaya a tener el calendario.
events: CalendarEvent[] = [
    /*{
      start: subDays(startOfDay(new Date()), 0),
      end: addDays(new Date(),0),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    },


    {
      start: startOfDay(new Date()),
      end: addDays(new Date(), 1),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions
    },



    { //Este es para las bolitas azules
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue,
      allDay: true
    },


    {    //Este es para las bolitas anaranjadas
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true  //*****************
    }*/
  ];

  /***************************************************************************************************/

activeDayIsOpen: boolean = false;

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
    this.handleEvent('Dropped or resized', event);
  }

  /***************************************************************************************************/

handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  /***************************************************************************************************/
/*
  getEventosUnDiaEst(fecha: string): Observable<any> {
    this.citasDia = [];
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
  }*/

  /***************************************************************************************************/

  recorrefechas() {
    this.horarioProfeSubs = this.getDiasConCita().subscribe(() => {

        for (var i = 0; i < this.listaFechas.length; i++) {
          this.addEvent(this.listaFechas[i]);
        }
      });
    this.loaded = Promise.resolve(true);
  }

  // *********************************************************************************************** */

addEvent(fecha: Date): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        }
      }
    ];
  }

  /***************************************************************************************************/

deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  /***************************************************************************************************/

setView(view: CalendarView) {
    this.view = view;
  }

  /***************************************************************************************************/

closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

getCitasDia(date: Date):Observable<any>{
  let options = { weekday: 'long', month: 'long', day: 'numeric' };
  let diaIng:string;
  let tiempoIni:string;
  let tiempoFin:string;
  let estadoS:string;
  let nombreS:string; 

  return this.calendarioService.getCitasDia(this.profesorActual.cedula, date.toISOString()).pipe(tap(data => {
    this.citasDiaObject = data;
    this.citasDiaObject.forEach(element => {

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

      this.citasDia.push(

        {
          nombre: nombreS,
          cedulaEst: element["cedula"],
          dia : diaIng,
          horaInicio:tiempoIni,
          horaFinal:tiempoFin,
          diaSinParsear:element["fecha"],
          estado:estadoS,
          siglaCurso: element["siglaCurso"],
          numGrupo: element["numGrupo"]

        });
  });
}));

}

}
