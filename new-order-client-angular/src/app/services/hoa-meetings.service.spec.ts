import { TestBed, inject } from '@angular/core/testing';

import { HoaMeetingsService } from './hoa-meetings.service';

describe('HoaMeetingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HoaMeetingsService]
    });
  });

  it('should be created', inject([HoaMeetingsService], (service: HoaMeetingsService) => {
    expect(service).toBeTruthy();
  }));
});
