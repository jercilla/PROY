import { TestBed } from '@angular/core/testing';

import { UserSettingsRepository } from './user-settings';

describe('UserSettingsRepository', () => {
  let service: UserSettingsRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSettingsRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
