import { TestBed } from '@angular/core/testing';

import { PlayerSettingsService } from './player-settings.service';

describe('PlayerSettingsService', () => {
  let service: PlayerSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
