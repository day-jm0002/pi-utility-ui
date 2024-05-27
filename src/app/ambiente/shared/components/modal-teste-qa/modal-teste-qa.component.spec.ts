import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTesteQaComponent } from './modal-teste-qa.component';

describe('ModalTesteQaComponent', () => {
  let component: ModalTesteQaComponent;
  let fixture: ComponentFixture<ModalTesteQaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalTesteQaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalTesteQaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
