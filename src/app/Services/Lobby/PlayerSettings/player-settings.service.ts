import { QueryIdentification } from './../../../Components/lobby/QueryIdentification';
import { Injectable } from '@angular/core';
import { Lobby } from '../Lobby';
import { LobbyWebSocketService } from '../lobby-web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerSettingsService {

  constructor(private lobbyWebSocketService: LobbyWebSocketService) { }

  flagPositionChange(playerid: string, flagx: number, flagy: number, lobby: Lobby){
    let playerIndex = lobby.players.findIndex(player => player.id === playerid);
    lobby.players[playerIndex].flagx = flagx;
    lobby.players[playerIndex].flagy = flagy;
  }

  changeFlagPosition(x: number, y: number, queryIdentification: QueryIdentification){
    const data = {"flagx": x, "flagy": y, "token": queryIdentification.token, "lobbyid": queryIdentification.roomid};
    let msg = this.lobbyWebSocketService.createMessage("flagposition_update", data)
    this.lobbyWebSocketService.sendMessage(queryIdentification.socket, msg)
  }
}
