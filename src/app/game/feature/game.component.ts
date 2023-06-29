import { Component, OnInit } from '@angular/core';
import { Map } from 'src/app/game/data_access/map';
import { globals } from 'src/app/globals';
import { QueryIdentification } from 'src/app/shared/data_access/query-identification';
import { CookieService } from 'src/app/shared/utils/cookie/cookie.service';
import { WebSocketService } from 'src/app/shared/utils/web_socket/web-socket.service';
import { MapService } from '../utils/map.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  map?: Map;
  messages: string[] = [];
  queryIdentification!: QueryIdentification;

  constructor(
    private cookieService: CookieService,
    private mapService: MapService,
    private webSocketService: WebSocketService
  ) {
    this.retrieveMap();
  }

  ngOnInit(): void {
    this.connect();
    this.webSocketService.redirectOnSocketClose(
      this.queryIdentification.socket
    );
  }

  connect() {
    const roomid = this.cookieService.getCookie('gameId');
    const token = this.cookieService.getCookie('token');
    const socket = new WebSocket(
      `ws://${globals.springServer}/game?game=${this.queryIdentification.roomId}&token=${this.queryIdentification.token}`
    );
    this.queryIdentification = new QueryIdentification(roomid, token, socket);
  }

  retrieveMap() {
    this.mapService.getMap('classic').subscribe((curmap) => {
      this.map = curmap;
    });
  }
}
