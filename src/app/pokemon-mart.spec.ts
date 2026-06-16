import { TestBed } from '@angular/core/testing';

import { PokemonMart } from './pokemon-mart';

describe('PokemonMart', () => {
  let service: PokemonMart;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonMart);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
