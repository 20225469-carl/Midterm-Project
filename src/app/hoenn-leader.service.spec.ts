import { TestBed } from '@angular/core/testing';

import { HoennLeaderService } from './hoenn-leader.service';

describe('HoennLeaderService', () => {
  let service: HoennLeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HoennLeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
