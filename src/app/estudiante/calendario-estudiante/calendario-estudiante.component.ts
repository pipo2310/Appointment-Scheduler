import { Component, OnInit } from '@angular/core';
import {
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef
} from '@angular/core';
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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';

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

  constructor(private modal: NgbModal) { }
dat: Array<Date> = new Array<Date>();
da:Date;
  ngOnInit() {
    this.da = new Date(2019, 4, 31);
    this.date.push(this.da);
    this.da = new Date(2019, 4, 30);
    this.date.push(this.da);
    this.recorrefechas();
  }
  date: Array<Date> = new Array<Date>();
  agregaFechas(dat:Date):void{
  //  this.date.push(dat)
 //dat.setDate(Date.parse(2019,5,28));
   dat = new Date(2019, 4, 31);
  this.date.push(dat);
       
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
 
   refresh: Subject<any> = new Subject();
 
   events: CalendarEvent[] = [
     
   
     
   ];
 
   activeDayIsOpen: boolean = true;
 
  
   dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
   
     if (isSameMonth(date, this.viewDate)) {
       this.viewDate = date;
       if (
         (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
         events.length === 0
       ) {
         this.activeDayIsOpen = false;
       } else {
         this.activeDayIsOpen = true;
       }
     }
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
     this.handleEvent('Dropped or resized', event);
   }
 
   handleEvent(action: string, event: CalendarEvent): void {
     this.modalData = { event, action };
     this.modal.open(this.modalContent, { size: 'lg' });
   }
  
 
 recorrefechas():void{
  
   for(var i = 0; i <this.date.length; i++){
  
   this.addEvent(this.date[i]);
   }
 }
 
   addEvent(fecha:Date): void {
 
     this.events = [
       ...this.events,
       {
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
