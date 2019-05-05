import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProfesorPruebaComponent } from './home-profesor-prueba.component';

describe('HomeProfesorPruebaComponent', () => {
  let component: HomeProfesorPruebaComponent;
  let fixture: ComponentFixture<HomeProfesorPruebaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeProfesorPruebaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeProfesorPruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
