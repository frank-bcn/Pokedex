import { TestBed } from '@angular/core/testing';

import { LoadPokemonService } from './load-pokemon.service';

describe('LoadPokemonService', () => {
  let service: LoadPokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadPokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
