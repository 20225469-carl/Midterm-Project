import { TestBed } from '@angular/core/testing';

import { PokemonMartService } from './pokemon-mart.service';

describe('PokemonMartService', () => {
  let service: PokemonMartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonMartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
