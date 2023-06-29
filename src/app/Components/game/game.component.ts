import { globals } from 'src/app/globals';
import { MapService } from 'src/app/Services/map.service';
import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/Services/Game/Player/player.service';
import { Map } from 'src/app/Objects/Game/map';
import { QueryIdentification } from '../lobby/QueryIdentification';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'src/app/Services/Shared/Cookie/cookie.service';
import { WebSocketService } from 'src/app/Services/Shared/WebSocket/web-socket.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit{

  map: Map | undefined;
  messages: string[] = [];
  socket!: WebSocket;
  queryIdentification: QueryIdentification = new QueryIdentification('', '', this.socket);

  constructor(private cookieService: CookieService, private mapService : MapService, private playerService: PlayerService, private webSocketService: WebSocketService){
    this.mapService.get_map("classic").subscribe((curmap) => {
      this.map = curmap;
      console.log(curmap)
    });
    this.queryIdentification.roomid = this.cookieService.getCookie("gameid")
    this.queryIdentification.token = this.cookieService.getCookie("token")
  }

  ngOnInit(): void {
      this.socket = this.connect(this.queryIdentification.roomid, this.queryIdentification.token);
      this.queryIdentification.socket = this.socket;
      this.webSocketService.redirectOnSocketClose(this.socket);
      this.receiveMessages(this.socket);
  }

  connect(gameid: string, token: string): WebSocket {
    return new WebSocket(
      `ws://${globals.spring_server}/game?game=${gameid}&token=${token}`
    );
  }

  sendMessage(message: string){
    console.log("Sent " + message);
    this.playerService.sendMessage(message);
  }

}
