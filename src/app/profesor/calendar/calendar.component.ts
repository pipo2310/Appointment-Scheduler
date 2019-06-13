import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef} from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours} from 'date-fns';
import { Subject, Observable, Subscription } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { viewAttached, element } from '@angular/core/src/render3/instructions';
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

  this.loaded = Promise.resolve(true);
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
  this.citasDia = new Array<CitaVistaProf>();
  var date = new Date();
  

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

  // Este método va relacionado a cuando se hace click en un día y se sepliega hacia abajo la lista de eventos
dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
  this.citasDia = [];
  for (let i = 0; i < this.listaFechas.length; i++) {
    if (date.getTime() == this.listaFechas[i].getTime()) {

      this.getCitasDia(date).subscribe(()=>{});

      this.modal.open(this.modalContent, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
      i = this.listaFechas.length
    }
  }

  /*this.citasDia = [];
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
    }*/
  }

  /***************************************************************************************************/

  async ngOnInit() {
    this.loaded = Promise.resolve(false);
    var date = new Date();
    this.primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
    this.ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    //this.horarioProfeSubs = await this.getDiasConCita().subscribe();
    await this.recorrefechas();

  }


  getDiasConCitas() {
    let diasCitaObject: Object[];
    console.log("hola");
    return this.calendarioService.getDiasConCita(this.primerDia.toISOString(), this.ultimoDia.toISOString(), this.profesorActual.cedula)
      .pipe(tap(data => {
        diasCitaObject = data,
          diasCitaObject.forEach(element => {
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


  // La variable events corresponede a las bolitas o eventos que hay en cada día, en este caso hay de 4 tipos posibles
  // En este vector deben estar todos los eventos que vaya a tener el calendario.
events: CalendarEvent[] = [];

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


  /***************************************************************************************************/

  recorrefechas() {
    this.horarioProfeSubs = this.getDiasConCitas().subscribe(() => {
        
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
    console.log(this.profesorActual);
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

parseISOString(s: string) {
  let b = s.split(/\D+/);
  return new Date(Number(b[0]), Number(b[1]) - 1, Number(b[2]));
}

}
