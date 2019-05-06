import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEstudiantePruebaComponent } from './home-estudiante-prueba.component';

describe('HomeEstudiantePruebaComponent', () => {
  let component: HomeEstudiantePruebaComponent;
  let fixture: ComponentFixture<HomeEstudiantePruebaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeEstudiantePruebaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeEstudiantePruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
