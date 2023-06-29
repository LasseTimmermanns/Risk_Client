import { DisplayMap, MiniatureMap } from '../../Components/lobby/Map';
import { LobbyWebSocketService } from './lobby-web-socket.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QueryIdentification } from 'src/app/Components/lobby/QueryIdentification';
import { InputEvent } from 'src/app/Components/shared/InputEvent';
import { globals } from 'src/app/globals';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {

  constructor(private lobbyWebSocketService: LobbyWebSocketService, private httpClient: HttpClient) { }

  leave(socket: WebSocket){
    let msg = this.lobbyWebSocketService.createEventMessage("leave");
    this.lobbyWebSocketService.sendMessage(socket, msg);
  }

  start(queryIdentification: QueryIdentification){
    const data = {"lobbyid": queryIdentification.roomid, "token": queryIdentification.token}
    let msg = this.lobbyWebSocketService.createMessage("start_game", data);

    this.lobbyWebSocketService.sendMessage(queryIdentification.socket, msg);
  }

  getDisplayMap(map_id: string): Observable<DisplayMap>{
    return this.httpClient.get<DisplayMap>(`${globals.spring_httpserver}/displaymaps/${map_id}`)
  }

  changeAttribute(event: InputEvent, queryIdentification: QueryIdentification){
    const data = {"lobbyid": queryIdentification.roomid, "value": event.value, "token": queryIdentification.token}
    const msg = this.lobbyWebSocketService.createMessage(event.name, data)

    this.lobbyWebSocketService.sendMessage(queryIdentification.socket, msg)
  }

  getAllMiniatureMaps(): Observable<MiniatureMap[]>{
    return this.httpClient.get<MiniatureMap[]>(`${globals.spring_httpserver}/displaymaps/all`)
  }


}
