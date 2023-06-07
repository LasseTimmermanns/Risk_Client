import { DisplayMap } from './../../Components/lobby/DisplayMap';
import { LobbyWebSocketService } from './lobby-web-socket.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  changePrivacy(lobbyid: string, new_privacy: boolean, token: string, socket: WebSocket){
    let data = `{lobbyid: '${lobbyid}', isPublic: ${new_privacy}, token: '${token}'}`
    let msg = this.lobbyWebSocketService.createMessage("privacy_change", data)
    this.lobbyWebSocketService.sendMessage(socket, msg)
  }

  getDisplayPath(map_name: string): Observable<DisplayMap>{
    return this.httpClient.get<DisplayMap>(`${globals.spring_server}/displaymaps/${map_name}`)
  }

}
