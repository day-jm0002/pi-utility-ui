import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLiberarAmbienteComponent } from './modal-liberar-ambiente.component';

describe('ModalLiberarAmbienteComponent', () => {
  let component: ModalLiberarAmbienteComponent;
  let fixture: ComponentFixture<ModalLiberarAmbienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalLiberarAmbienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalLiberarAmbienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
