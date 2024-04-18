import { TestBed } from '@angular/core/testing';

import { FundosService } from './fundos.service';

describe('FundosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FundosService = TestBed.get(FundosService);
    expect(service).toBeTruthy();
  });
});
