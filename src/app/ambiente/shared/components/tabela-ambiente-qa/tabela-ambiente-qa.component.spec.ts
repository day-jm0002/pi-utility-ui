import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaAmbienteQaComponent } from './tabela-ambiente-qa.component';

describe('TabelaAmbienteQaComponent', () => {
  let component: TabelaAmbienteQaComponent;
  let fixture: ComponentFixture<TabelaAmbienteQaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabelaAmbienteQaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabelaAmbienteQaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
