import { Router } from '@angular/router';
import { QueryIdentification } from './../../data_access/query-identification';
export class WebSocketHelper {
  static createMessage(event: string, data: any) {
    const obj = { event: event, data: data };
    return JSON.stringify(obj);
  }

  static createGameActionMessage(
    gameAction: string,
    queryIdentification: QueryIdentification,
    data: any
  ) {
    const obj = {
      event: 'gameaction',
      action: gameAction,
      data: {
        token: queryIdentification.token,
        gameId: queryIdentification.roomId,
      },
      actiondata: data,
    };
    return JSON.stringify(obj);
  }

  static createEmptyGameActionMessage(
    gameAction: string,
    queryIdentification: QueryIdentification
  ) {
    const obj = {
      event: 'gameaction',
      action: gameAction,
      data: {
        token: queryIdentification.token,
        gameId: queryIdentification.roomId,
      },
    };
    return JSON.stringify(obj);
  }

  static createEventMessage(event: any) {
    const obj = { event: event };
    return JSON.stringify(obj);
  }

  static redirectOnSocketClose(socket: WebSocket, router: Router) {
    socket.onclose = (event) => {
      router.navigate(['']);
    };
  }
}
