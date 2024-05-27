import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarAmbienteComponent } from './modal-editar-ambiente.component';

describe('ModalEditarAmbienteComponent', () => {
  let component: ModalEditarAmbienteComponent;
  let fixture: ComponentFixture<ModalEditarAmbienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalEditarAmbienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalEditarAmbienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
