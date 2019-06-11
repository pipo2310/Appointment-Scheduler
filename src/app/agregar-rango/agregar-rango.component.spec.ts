import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarRangoComponent } from './agregar-rango.component';

describe('AgregarRangoComponent', () => {
  let component: AgregarRangoComponent;
  let fixture: ComponentFixture<AgregarRangoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarRangoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarRangoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
