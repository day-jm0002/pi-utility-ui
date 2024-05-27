import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaAmbientesComponent } from './tabela-ambientes.component';

describe('TabelaAmbientesComponent', () => {
  let component: TabelaAmbientesComponent;
  let fixture: ComponentFixture<TabelaAmbientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabelaAmbientesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabelaAmbientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
