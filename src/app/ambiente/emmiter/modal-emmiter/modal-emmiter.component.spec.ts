import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEmmiterComponent } from './modal-emmiter.component';

describe('ModalEmmiterComponent', () => {
  let component: ModalEmmiterComponent;
  let fixture: ComponentFixture<ModalEmmiterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalEmmiterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalEmmiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
