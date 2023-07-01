import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { globals } from 'src/app/globals';
import { QueryIdentification } from 'src/app/shared/data_access/query-identification';
import { CookieService } from 'src/app/shared/utils/cookie/cookie.service';
import { WebSocketHelper } from 'src/app/shared/utils/web_socket/web-socket';
import { InputEvent } from '../data_access/input-event';
import { DisplayMap, MiniatureMap } from '../data_access/lobby-map';

@Injectable({
  providedIn: 'root',
})
export class LobbyService {
  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {}

  leave(socket: WebSocket) {
    let msg = WebSocketHelper.createEventMessage('leave');
    socket.send(msg);
  }

  start(queryIdentification: QueryIdentification) {
    const data = {
      lobbyId: queryIdentification.roomId,
      token: queryIdentification.token,
    };
    let msg = WebSocketHelper.createMessage('start_game', data);

    queryIdentification.socket.send(msg);
  }

  getDisplayMap(map_id: string): Observable<DisplayMap> {
    return this.httpClient.get<DisplayMap>(
      `${globals.springHttpServer}/displaymaps/${map_id}`
    );
  }

  changeAttribute(event: InputEvent, queryIdentification: QueryIdentification) {
    const data = {
      lobbyId: queryIdentification.roomId,
      value: event.value,
      token: queryIdentification.token,
    };
    const msg = WebSocketHelper.createMessage(event.name, data);

    queryIdentification.socket.send(msg);
  }

  getAllMiniatureMaps(): Observable<MiniatureMap[]> {
    return this.httpClient.get<MiniatureMap[]>(
      `${globals.springHttpServer}/displaymaps/all`
    );
  }

  saveDataInCookie(queryIdentification: QueryIdentification) {
    this.cookieService.setCookie('gameId', queryIdentification.roomId, 1);
    this.cookieService.setCookie('token', queryIdentification.token, 1);
  }
}
