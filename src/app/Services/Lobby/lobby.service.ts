import { LobbyWebSocketService } from './lobby-web-socket.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Color } from '../Settings/Color';
import { globals } from 'src/app/globals';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {

  constructor(private lobbyWebSocketService: LobbyWebSocketService) { }

  leave(socket: WebSocket){
    let msg = this.lobbyWebSocketService.createEventMessage("leave");
    this.lobbyWebSocketService.sendMessage(socket, msg);
  }

}
