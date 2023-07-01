import { QueryIdentification } from 'src/app/shared/data_access/query-identification';
import { WebSocketHelper } from 'src/app/shared/utils/web_socket/web-socket';
import { Lobby } from '../data_access/lobby';

export class FlagPosition {
  static flagPositionChange(
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

  static changeFlagPosition(
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
    let msg = WebSocketHelper.createMessage('flagposition_update', data);
    queryIdentification.socket.send(msg);
  }
}
