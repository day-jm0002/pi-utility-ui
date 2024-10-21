import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenarioComponent } from './cenario.component';

describe('CenarioComponent', () => {
  let component: CenarioComponent;
  let fixture: ComponentFixture<CenarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CenarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CenarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
