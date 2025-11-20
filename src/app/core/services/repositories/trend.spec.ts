import { TestBed } from '@angular/core/testing';

import { TrendRepository } from './trend';

describe('TrendRepository', () => {
  let service: TrendRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrendRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
