import { TestBed } from '@angular/core/testing';

import { CargaArchivoServiceService } from './carga-archivo-service.service';

describe('CargaArchivoServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CargaArchivoServiceService = TestBed.get(CargaArchivoServiceService);
    expect(service).toBeTruthy();
  });
});
