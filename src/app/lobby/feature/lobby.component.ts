import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { globals } from 'src/app/globals';
import { QueryIdentification } from 'src/app/shared/data_access/query-identification';
import { WebSocketService } from 'src/app/shared/utils/web_socket/web-socket.service';
import { DisplayMap } from '../../lobby/data_access/lobby-map';
import { Lobby } from '../data_access/lobby';
import { LobbyPlayer } from '../data_access/lobby-player';
import { ColorChangingService } from '../utils/color-changing.service';
import { FlagPositionService } from '../utils/flag-position.service';
import { LobbyService } from '../utils/lobby.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss', './settings.scss'],
})
export class LobbyComponent {
  lobby?: Lobby;
  sortedPlayers: LobbyPlayer[] = [];
  playerId: string = '';
  display_map?: DisplayMap;

  queryIdentification?: QueryIdentification;

  draw_settings_menu: boolean = false;

  is_host: boolean = false;

  names = [
    'Lasse',
    'Sverre',
    'Timon',
    'Jojo',
    'Jan',
    'Alex',
    'Levin',
    'Mats',
    'Erik',
    'Caspar',
  ];

  @ViewChild('content') contentRef!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lobbyService: LobbyService,
    private colorChangingService: ColorChangingService,
    private playerSettingsService: FlagPositionService,
    private webSocketService: WebSocketService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const roomId = params['lobbyId'];
      const name = this.names[Math.floor(Math.random() * this.names.length)];

      this.connect(roomId, name).then(() => {
        this.receiveMessages(this.queryIdentification!.socket);
        this.webSocketService.redirectOnSocketClose(
          this.queryIdentification!.socket
        );
      });
    });
  }

  async connect(lobbyId: string, playername: string) {
    const socket = new WebSocket(
      `ws://${globals.springServer}/lobby?lobby=${lobbyId}&playername=${playername}`
    );
    this.queryIdentification = new QueryIdentification(lobbyId, '', socket);
  }

  updatePlayerIsHost() {
    const index_host: number = this.lobby!.players.findIndex(
      (player) => player.host === true
    );
    const host_id: string = this.lobby!.players[index_host].id;

    this.is_host = host_id === this.playerId;
    return this.is_host;
  }

  switchView() {
    if (!this.is_host) return;
    this.draw_settings_menu = !this.draw_settings_menu;
  }

  receiveMessages(socket: WebSocket): void {
    socket.onmessage = (event) => {
      let data = JSON.parse(event.data);
      let eventType = data.event;
      console.log(data);

      switch (eventType) {
        case 'declined':
          console.log('Declined');
          break;
        case 'join_accepted':
          this.joinAccepted(data.data);
          this.initializeMap();
          break;
        case 'join':
          this.playerJoin(data.data);
          break;
        case 'player_quit':
          this.playerQuit(data.data);
          break;
        case 'token_granted':
          this.tokenGranted(data.data);
          break;
        case 'privacy_change':
          this.lobby!.isPublic = data.data.value;
          break;
        case 'turn_timer_change':
          this.lobby!.turnTimer = data.data.value;
          break;
        case 'card_bonus_change':
          this.lobby!.isFixed = data.data.value;
          break;
        case 'max_players_change':
          this.lobby!.maxPlayers = data.data.value;
          break;
        case 'color_change':
          this.colorChangingService.colorChanged(data.data, this.lobby!);
          break;
        case 'flagposition_update':
          this.playerSettingsService.flagPositionChange(
            data.data.playerId,
            data.data.flagx,
            data.data.flagy,
            this.lobby!
          );
          this.sortedPlayers = this.createSortedPlayers(this.lobby!);
          break;
        case 'map_change':
          this.lobby!.mapId = data.data.value;
          this.initializeMap();
          break;
        case 'start_game':
          this.startedGame();
          break;
        default:
          console.log(data);
          break;
      }
    };
  }

  tokenGranted(data: any) {
    this.queryIdentification!.token = data.token;
    this.playerId = data.playerId;
  }

  joinAccepted(data: Lobby) {
    this.lobby = data;
    this.updatePlayerIsHost();
    this.sortedPlayers = this.createSortedPlayers(data);
  }

  initializeMap() {
    this.lobbyService.getDisplayMap(this.lobby!.mapId).subscribe((res) => {
      this.display_map = res;
    });
  }

  playerJoin(data: LobbyPlayer) {
    this.lobby!.players.push(data);
  }

  playerQuit(data: any) {
    if (!this.lobby) return;

    const id = data.id;
    const index_quit = this.lobby.players.findIndex(
      (player) => player.id === id
    );

    if (index_quit != -1) this.lobby.players.splice(index_quit!, 1);

    const new_host_id: string = data.host;
    const index_host: number = this.lobby.players.findIndex(
      (player) => player.id === new_host_id
    );

    this.lobby.players[index_host].host = true;
    this.updatePlayerIsHost();
  }

  createSortedPlayers(lobby: Lobby) {
    let players = lobby.players;
    players.sort(function (a, b) {
      return a.flagy - b.flagy;
    });
    return players;
  }

  leave() {
    if (!this.queryIdentification) return;
    this.lobbyService.leave(this.queryIdentification.socket);
  }

  start() {
    if (!this.queryIdentification) return;
    this.lobbyService.start(this.queryIdentification);
  }

  startedGame() {
    this.router.navigate(['/game']);
  }
}
