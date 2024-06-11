import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLimparCacheComponent } from './modal-limpar-cache.component';

describe('ModalLimparCacheComponent', () => {
  let component: ModalLimparCacheComponent;
  let fixture: ComponentFixture<ModalLimparCacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalLimparCacheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalLimparCacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
