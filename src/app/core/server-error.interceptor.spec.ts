import { TestBed } from '@angular/core/testing';

import { ServerErrorsInterceptor } from './server-error.interceptor';

describe('ServerErrorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ServerErrorsInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ServerErrorsInterceptor = TestBed.inject(ServerErrorsInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
