import { TestBed } from '@angular/core/testing';

import { PokemonShowcase } from './pokemon-showcase';

describe('PokemonShowcase', () => {
  let service: PokemonShowcase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonShowcase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
