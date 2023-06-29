import { TestBed } from '@angular/core/testing';

import { FlagPositionService } from './flag-position.service';

describe('PlayerSettingsService', () => {
  let service: FlagPositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlagPositionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
