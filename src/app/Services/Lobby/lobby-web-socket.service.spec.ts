import { TestBed } from '@angular/core/testing';

import { LobbyWebSocketService } from './lobby-web-socket.service';

describe('LobbyWebSocketService', () => {
  let service: LobbyWebSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LobbyWebSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
