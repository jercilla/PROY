import { TestBed } from '@angular/core/testing';

import { HistorySupabase } from './history-supabase';

describe('HistorySupabase', () => {
  let service: HistorySupabase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistorySupabase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
