import { TestBed } from '@angular/core/testing';

import { LoadEvolutionService } from './load-evolution.service';

describe('LoadEvolutionService', () => {
  let service: LoadEvolutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadEvolutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
