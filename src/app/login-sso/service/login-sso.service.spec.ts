import { TestBed } from '@angular/core/testing';

import { LoginSSOService } from './login-sso.service';

describe('LoginSSOService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginSSOService = TestBed.get(LoginSSOService);
    expect(service).toBeTruthy();
  });
});
