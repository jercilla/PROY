import { TestBed } from '@angular/core/testing';

import { HistoryRepository } from './history';

describe('HistoryRepository', () => {
  let service: HistoryRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
