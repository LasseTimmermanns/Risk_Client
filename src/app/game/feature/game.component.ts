import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Map } from 'src/app/game/data_access/map';
import { globals } from 'src/app/globals';
import { QueryIdentification } from 'src/app/shared/data_access/query-identification';
import { CookieService } from 'src/app/shared/utils/cookie/cookie.service';
import { WebSocketHelper } from 'src/app/shared/utils/web_socket/web-socket';
import { Game } from '../data_access/game';
import { Player } from '../data_access/player';
import { TroopMovementSliderComponent } from '../ui/troop-movement-slider/troop-movement-slider.component';
import { MapService } from '../utils/map.service';
import { DisplayPlayer } from './../data_access/player';
import { GameTerritory } from './../data_access/territory';
import { GameMapService } from './../utils/game-map.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  map?: Map;
  messages: string[] = [];
  queryIdentification!: QueryIdentification;
  game?: Game;
  displayPlayers: DisplayPlayer[] = [];
  playerOnTurn?: string;
  thisPlayersTurn: boolean = false;
  playerId?: string;

  @ViewChild('selection', { read: ViewContainerRef, static: true })
  selectionDiv!: ViewContainerRef;

  constructor(
    private cookieService: CookieService,
    private mapService: MapService,
    private router: Router,
    private gameMapService: GameMapService
  ) {}

  ngOnInit(): void {
    this.connect();
    WebSocketHelper.redirectOnSocketClose(
      this.queryIdentification.socket,
      this.router
    );

    this.receiveMessages(this.queryIdentification.socket);
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

    socket.onclose = (e) => {
      this.router.navigate(['']);
    };

    this.queryIdentification = new QueryIdentification(roomId, token, socket);
  }

  retrieveMap(mapId: string) {
    this.mapService.getMap(mapId).subscribe((curmap) => {
      this.map = curmap;
    });
  }

  createDisplayPlayers(players: Player[], territories: GameTerritory[]) {
    var displayPlayers: DisplayPlayer[] = [];

    players.forEach((player) => {
      const displayPlayer: DisplayPlayer = {
        id: player.id,
        name: player.name,
        color: player.color, // Assuming "blue" is a valid Color value
        seat: player.seat,
        cards: player.cards.length,
        territoryCount: 0,
        troopCount: 0,
      };

      displayPlayers.push(displayPlayer);
    });

    territories.forEach((territory) => {
      const owner = displayPlayers.find(
        (displayPlayer) => displayPlayer.id === territory.owner
      );
      if (owner) {
        owner.territoryCount++;
        owner.troopCount += territory.troops;
      }
    });

    return displayPlayers;
  }

  receiveMessages(socket: WebSocket) {
    socket.onmessage = (event) => {
      let data = JSON.parse(event.data);
      let eventType = data.event;
      console.log(data);

      switch (eventType) {
        case 'success':
          this.game = data.data;
          this.retrieveShapes();
          this.retrieveMap(this.game!.mapId);
          this.displayPlayers = this.createDisplayPlayers(
            data.data.players,
            data.data.territories
          );
          this.updatePlayerOnTurn();
          break;
        case 'playerId':
          this.playerId = data.data.playerId;
          this.updatePlayersTurn();
          break;
        case 'declined':
          console.log('Declined');
      }
    };
  }

  retrieveShapes() {
    this.gameMapService
      .getShapes(this.game!.players.length)
      .subscribe((shapes) => {
        for (let i = 0; i < shapes.length; i++) {
          this.game!.players[i].shape = shapes[i];
        }
      });
  }

  updatePlayerOnTurn() {
    if (!this.game) return;

    const turn = this.game.turn;
    const playerCount = this.game.players.length;

    const currentSeat = turn % playerCount;

    const currentPlayer = this.game.players.find(
      (player) => player.seat === currentSeat
    );

    if (!currentPlayer) throw Error('CurrentPlayer not found');

    this.playerOnTurn = currentPlayer.id;
    this.updatePlayersTurn();
  }

  updatePlayersTurn() {
    console.log('This Players Turn', this.playerOnTurn === this.playerId);
    this.thisPlayersTurn = this.playerOnTurn === this.playerId;
  }

  retrieveTroopCount() {
    const slider = this.selectionDiv.createComponent(
      TroopMovementSliderComponent
    );
    slider.setInput('min', 1);
    slider.setInput('max', 10);

    slider.instance.indexChange.subscribe((value: number) => {
      console.log(value);
    });
  }

  ngAfterViewInit(): void {
    // this.retrieveTroopCount();
  }
}
