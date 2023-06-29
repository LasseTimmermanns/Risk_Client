import { TestBed } from '@angular/core/testing';

import { LobbyNavigationService } from './lobby-navigation.service';

describe('LobbyNavigationService', () => {
  let service: LobbyNavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LobbyNavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
