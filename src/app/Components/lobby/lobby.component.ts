import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColorChangingService } from 'src/app/Services/Lobby/Color/color-changing.service';
import { Lobby } from 'src/app/Services/Lobby/Lobby';
import { LobbyPlayer } from 'src/app/Services/Lobby/LobbyPlayer';
import { LobbyService } from 'src/app/Services/Lobby/lobby.service';
import { DisplayMap } from './Map';
import { PlayerSettingsService } from 'src/app/Services/Lobby/PlayerSettings/player-settings.service';
import { InputEvent } from '../shared/InputEvent';
import { QueryIdentification } from './QueryIdentification';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: [
    './lobby.component.scss',
    './changeable_settings.scss',
    './settings.scss',
  ],
})
export class LobbyComponent {
  lobby?: Lobby;
  sortedPlayers: LobbyPlayer[] = [];
  playerid: string = '';
  display_map?: DisplayMap;
  socket!: WebSocket;

  queryIdentification: QueryIdentification = new QueryIdentification(
    '',
    '',
    this.socket
  );

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
    private playerSettingsService: PlayerSettingsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.queryIdentification.lobbyid = params['lobbyid'];
      let name = this.names[Math.floor(Math.random() * this.names.length)];
      this.socket = this.connect(this.queryIdentification.lobbyid, name);
      this.queryIdentification.socket = this.socket;
      this.receiveMessages(this.socket);
      this.redirectOnSocketClose(this.socket);
    });
  }

  updatePlayerIsHost() {
    const index_host: number = this.lobby!.players.findIndex(
      (player) => player.host === true
    );
    const host_id: string = this.lobby!.players[index_host].id;

    this.is_host = host_id === this.playerid;
    return this.is_host;
  }

  switch_view() {
    if (!this.is_host) return;
    this.draw_settings_menu = !this.draw_settings_menu;
  }

  connect(lobbyid: string, playername: string): WebSocket {
    return new WebSocket(
      `ws://localhost:8080/lobby?lobby=${lobbyid}&playername=${playername}`
    );
  }

  redirectOnSocketClose(socket: WebSocket) {
    socket.onclose = (event) => {
      // console.log('closed');
      this.router.navigate(['']);
    };
  }

  receiveMessages(socket: WebSocket): void {
    socket.onmessage = (event) => {
      console.log(event.data);
      console.log("--")
      let data = JSON.parse(event.data);
      let eventType = data.event;

      // console.log('---');
      // console.log(eventType);
      // console.log(data.data);
      // console.log('---');

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
          this.lobby!.is_public = data.data.value;
          break;
        case 'turn_timer_change':
          this.lobby!.turn_timer = data.data.value;
          break;
        case 'card_bonus_change':
          this.lobby!.is_fixed = data.data.value;
          break;
        case 'max_players_change':
          this.lobby!.max_players = data.data.value;
          break;
        case 'color_change':
          this.colorChangingService.colorChanged(data.data, this.lobby!);
          break;
        case 'flagposition_update':
          this.playerSettingsService.flagPositionChange(
            data.data.playerid,
            data.data.flagx,
            data.data.flagy,
            this.lobby!
          );
          this.sortedPlayers = this.createSortedPlayers(this.lobby!);
          break;
        case 'map_change':
          this.lobby!.map_id = data.data.value;
          this.initializeMap();
          break;
        default:
          console.log(data);
          break;
      }
    };
  }

  tokenGranted(data: any) {
    this.queryIdentification.token = data.token;
    this.playerid = data.playerid;
  }

  joinAccepted(data: Lobby) {
    this.lobby = data;
    this.updatePlayerIsHost();
    this.sortedPlayers = this.createSortedPlayers(data);
  }

  initializeMap() {
    console.log(this.lobby!.map_id)
    this.lobbyService.getDisplayMap(this.lobby!.map_id).subscribe((res) => {
      this.display_map = res;
      console.log("New Map")
      console.log(res)
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
    this.lobbyService.leave(this.socket);
  }
}
