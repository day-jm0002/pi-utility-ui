import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaTestesQaComponent } from './tabela-testes-qa.component';

describe('TabelaTestesQaComponent', () => {
  let component: TabelaTestesQaComponent;
  let fixture: ComponentFixture<TabelaTestesQaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabelaTestesQaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabelaTestesQaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
