import { TestBed } from '@angular/core/testing';

import { InformacoesAmbienteService } from './informacoes-ambiente.service';

describe('InformacoesAmbienteService', () => {
  let service: InformacoesAmbienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformacoesAmbienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
