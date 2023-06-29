import { Injectable } from '@angular/core';
import { QueryIdentification } from 'src/app/shared/data_access/query-identification';
import { WebSocketService } from 'src/app/shared/utils/web_socket/web-socket.service';
import { Lobby } from '../data_access/lobby';

@Injectable({
  providedIn: 'root',
})
export class FlagPositionService {
  constructor(private webSocketService: WebSocketService) {}

  flagPositionChange(
    playerId: string,
    flagx: number,
    flagy: number,
    lobby: Lobby
  ) {
    let playerIndex = lobby.players.findIndex(
      (player) => player.id === playerId
    );
    lobby.players[playerIndex].flagx = flagx;
    lobby.players[playerIndex].flagy = flagy;
  }

  changeFlagPosition(
    x: number,
    y: number,
    queryIdentification: QueryIdentification
  ) {
    const data = {
      flagx: x,
      flagy: y,
      token: queryIdentification.token,
      lobbyId: queryIdentification.roomId,
    };
    let msg = this.webSocketService.createMessage('flagposition_update', data);
    this.webSocketService.sendMessage(queryIdentification.socket, msg);
  }
}
