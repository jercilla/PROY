import { TestBed } from '@angular/core/testing';

import { TrendsSupabase } from './trends-supabase';

describe('TrendsSupabase', () => {
  let service: TrendsSupabase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrendsSupabase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
