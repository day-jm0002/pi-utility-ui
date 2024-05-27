import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarAmbienteQaComponent } from './modal-editar-ambiente-qa.component';

describe('ModalEditarAmbienteQaComponent', () => {
  let component: ModalEditarAmbienteQaComponent;
  let fixture: ComponentFixture<ModalEditarAmbienteQaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalEditarAmbienteQaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalEditarAmbienteQaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
