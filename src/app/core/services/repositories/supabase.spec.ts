import { TestBed } from '@angular/core/testing';

import { SupabaseRepository } from './supabase';

describe('SupabaseRepository', () => {
  let service: SupabaseRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupabaseRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
