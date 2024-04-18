import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundosComponent } from './fundos.component';

describe('FundosComponent', () => {
  let component: FundosComponent;
  let fixture: ComponentFixture<FundosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
