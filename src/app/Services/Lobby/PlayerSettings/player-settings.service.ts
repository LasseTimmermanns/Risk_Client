import { Injectable } from '@angular/core';
import { Lobby } from '../Lobby';
import { LobbyWebSocketService } from '../lobby-web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerSettingsService {

  constructor(private lobbyWebSocketService: LobbyWebSocketService) { }

  flagPositionChange(playerid: string, flagx: number, flagy: number, scale_factor: number, lobby: Lobby){
    let playerIndex = lobby.players.findIndex(player => player.id === playerid);
    console.log("Index", playerIndex)
    lobby.players[playerIndex].flagx = flagx;
    lobby.players[playerIndex].flagy = flagy;
  }

  changeFlagPosition(x: number, y: number, token: string, lobbyid: string, socket: WebSocket){
    let data = `{flagx: '${x}', flagy: ${y}, token: '${token}', lobbyid: '${lobbyid}'}`
    let msg = this.lobbyWebSocketService.createMessage("flagposition_update", data)
    this.lobbyWebSocketService.sendMessage(socket, msg)
  }
}
