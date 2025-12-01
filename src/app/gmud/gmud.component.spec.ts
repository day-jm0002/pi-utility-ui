import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GmudComponent } from './gmud.component';

describe('GmudComponent', () => {
  let component: GmudComponent;
  let fixture: ComponentFixture<GmudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GmudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GmudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
