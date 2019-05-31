import { TestBed } from '@angular/core/testing';

import { CalendarioServiceService } from './calendario-service.service';

describe('CalendarioServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalendarioServiceService = TestBed.get(CalendarioServiceService);
    expect(service).toBeTruthy();
  });
});
