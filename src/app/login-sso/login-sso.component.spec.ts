import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSSOComponent } from './login-sso.component';

describe('LoginSSOComponent', () => {
  let component: LoginSSOComponent;
  let fixture: ComponentFixture<LoginSSOComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginSSOComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSSOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
