import { TestBed } from '@angular/core/testing';

import { GestorService } from './gestor.service';

describe('GestorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GestorService = TestBed.get(GestorService);
    expect(service).toBeTruthy();
  });
});
