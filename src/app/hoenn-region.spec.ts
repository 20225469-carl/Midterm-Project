import { TestBed } from '@angular/core/testing';

import { HoennRegion } from './hoenn-region';

describe('HoennRegion', () => {
  let service: HoennRegion;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HoennRegion);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
