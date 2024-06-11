import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusCacheComponent } from './status-cache.component';

describe('StatusCacheComponent', () => {
  let component: StatusCacheComponent;
  let fixture: ComponentFixture<StatusCacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatusCacheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatusCacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
