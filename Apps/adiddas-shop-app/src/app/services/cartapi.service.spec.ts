import { TestBed } from '@angular/core/testing';

import { CartapiService } from './cart-api.service';

describe('CartapiService', () => {
  let service: CartapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
