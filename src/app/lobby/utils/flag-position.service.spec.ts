import { TestBed } from '@angular/core/testing';

import { FlagPosition } from './flag-position.service';

describe('PlayerSettingsService', () => {
  let service: FlagPosition;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlagPosition);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
