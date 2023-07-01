import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Map } from 'src/app/game/data_access/map';
import { globals } from 'src/app/globals';
import { QueryIdentification } from 'src/app/shared/data_access/query-identification';
import { CookieService } from 'src/app/shared/utils/cookie/cookie.service';
import { WebSocketHelper } from 'src/app/shared/utils/web_socket/web-socket';
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
    private router: Router
  ) {
    this.retrieveMap();
  }

  ngOnInit(): void {
    this.connect();
    WebSocketHelper.redirectOnSocketClose(
      this.queryIdentification.socket,
      this.router
    );
  }

  connect() {
    const roomId = this.cookieService.getCookie('gameId');
    const token = this.cookieService.getCookie('token');
    const socket = new WebSocket(`ws://${globals.springServer}/game`);

    socket.onopen = (e) => {
      const msg = WebSocketHelper.createMessage('join', {
        gameId: roomId,
        token: token,
      });

      console.log(socket);
      socket.send(msg);
    };

    this.queryIdentification = new QueryIdentification(roomId, token, socket);
  }

  retrieveMap() {
    this.mapService.getMap('classic').subscribe((curmap) => {
      this.map = curmap;
    });
  }
}
