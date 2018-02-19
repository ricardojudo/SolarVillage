import { TestBed, inject } from '@angular/core/testing';

import { NewOrdersService } from './new-orders.service';

describe('NewOrdersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewOrdersService]
    });
  });

  it('should be created', inject([NewOrdersService], (service: NewOrdersService) => {
    expect(service).toBeTruthy();
  }));
});
