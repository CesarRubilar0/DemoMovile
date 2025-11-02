import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
    localStorage.clear();
  });

  it('should register and get current user', () => {
    const ok = service.register('a@b.com', 'secret');
    expect(ok).toBeTrue();
    const u = service.getCurrentUser();
    expect(u).toBeTruthy();
    expect(u?.email).toBe('a@b.com');
  });

  it('should login and logout', () => {
    const ok = service.login('x@y.com', '1234');
    expect(ok).toBeTrue();
    expect(service.getCurrentUser()).toBeTruthy();
    service.logout();
    expect(service.getCurrentUser()).toBeNull();
  });
});
