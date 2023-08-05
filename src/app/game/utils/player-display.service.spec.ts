import { TestBed } from '@angular/core/testing';

import { PlayerDisplayService } from './player-display.service';

describe('PlayerDisplayService', () => {
  let service: PlayerDisplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerDisplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
