import { TestBed } from '@angular/core/testing';

import { CalendarioProfesorService } from './calendario-profesor.service';

describe('CalendarioProfesorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalendarioProfesorService = TestBed.get(CalendarioProfesorService);
    expect(service).toBeTruthy();
  });
});
