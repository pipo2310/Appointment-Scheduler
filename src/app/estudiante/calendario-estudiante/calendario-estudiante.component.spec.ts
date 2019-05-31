import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioEstudianteComponent } from './calendario-estudiante.component';

describe('CalendarioEstudianteComponent', () => {
  let component: CalendarioEstudianteComponent;
  let fixture: ComponentFixture<CalendarioEstudianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarioEstudianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarioEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
