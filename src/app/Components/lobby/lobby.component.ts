import {
  Component,
  ElementRef,
  HostListener,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColorChangingService } from 'src/app/Services/Lobby/Color/color-changing.service';
import { Lobby } from 'src/app/Services/Lobby/Lobby';
import { LobbyPlayer } from 'src/app/Services/Lobby/LobbyPlayer';
import { LobbyService } from 'src/app/Services/Lobby/lobby.service';
import { DisplayMap } from './DisplayMap';
import { PlayerSettingsService } from 'src/app/Services/Lobby/PlayerSettings/player-settings.service';
@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: [
    './lobby.component.scss',
    './playerstyle.scss',
    './lobby_responsive.scss',
    './map.scss',
  ],
})
export class LobbyComponent {
  drawPlayers: boolean = true;
  lobby?: Lobby;
  lobbyid?: string;
  sortedPlayers: LobbyPlayer[] = [];
  openSlots: number[] = [];
  token: string = '';
  playerid: string = '';
  display_map?: DisplayMap;
  socket!: WebSocket;

  rectheight: number = 332;
  scale_factor: number = 0.5;

  @ViewChild('map', { static: false }) mapRef?: ElementRef;

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

  ngAfterViewInit(): void {
    this.route.params.subscribe((params) => {
      this.lobbyid = params['lobbyid'];
      let name = this.names[Math.floor(Math.random() * this.names.length)];
      this.socket = this.connect(this.lobbyid!, name);
      this.receiveMessages(this.socket);
      this.redirectOnSocketClose(this.socket);
    });
  }

  getScales() {
    let svg_width = this.mapRef?.nativeElement.clientWidth;
    let svg_height = this.mapRef?.nativeElement.clientHeight;

    let scale_x = svg_width / this.display_map!.width;
    let scale_y = svg_height / this.display_map!.height;

    return [scale_x, scale_y];
  }


  handleClick(event: any) {
    let scale_x = this.getScales()[0];
    let scale_y = this.getScales()[1];

    let flagx = event.offsetX / scale_x;
    let flagy = event.offsetY / scale_y;

    this.playerSettingsService.changeFlagPosition(
      flagx,
      flagy,
      this.token,
      this.lobbyid!,
      this.socket
    );
  }

  connect(lobbyid: string, playername: string): WebSocket {
    return new WebSocket(
      `ws://localhost:8080/lobby?lobby=${lobbyid}&playername=${playername}`
    );
  }

  switchView() {
    this.drawPlayers = !this.drawPlayers;
  }

  redirectOnSocketClose(socket: WebSocket) {
    socket.onclose = (event) => {
      console.log('closed');
      this.router.navigate(['']);
    };
  }

  receiveMessages(socket: WebSocket): void {
    socket.onmessage = (event) => {
      let data = JSON.parse(event.data);
      let eventType = data.event;

      console.log("---")
      console.log(eventType)
      console.log(data.data);
      console.log("---")

      switch (eventType) {
        case 'declined':
          console.log('Declined');
          break;
        case 'join_accepted':
          this.joinAccepted(data.data);
          this.initializeMap(data.data);
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
          this.privacyChanged(data.data);
          break;
        case 'color_change':
          this.colorChangingService.colorChanged(data.data, this.lobby!);
          break;
          case 'flagposition_update':
            this.playerSettingsService.flagPositionChange(
              data.data.playerid,
              data.data.flagx,
              data.data.flagy,
              this.scale_factor,
              this.lobby!
              );
            this.sortedPlayers = this.createSortedPlayers(this.lobby!);
          break;
        default:
          console.log(data);
          break;
      }
    };
  }

  tokenGranted(data: any) {
    this.token = data.token;
    this.playerid = data.playerid;
  }

  joinAccepted(data: Lobby) {
    this.lobby = data;
    this.sortedPlayers = this.createSortedPlayers(data);
  }

  initializeMap(data: Lobby) {
    console.log('I want ' + data.mapId);
    this.lobbyService.getDisplayMap(data.mapId).subscribe((res) => {
      this.display_map = res;
      console.log(res);
    });
  }

  privacyChanged(data: any) {
    this.lobby!.isPublic = data.isPublic;
  }

  changePrivacy() {
    this.lobbyService.changePrivacy(
      this.lobbyid!,
      !this.lobby!.isPublic,
      this.token,
      this.socket
    );
  }

  playerJoin(data: LobbyPlayer) {
    this.lobby!.players.push(data);
  }

  playerQuit(data: any) {
    if(!this.lobby) return;

    const id = data.id;
    const index_quit = this.lobby.players.findIndex((player) => player.id === id);

    if (index_quit != -1) this.lobby.players.splice(index_quit!, 1);

    const new_host_id : string = data.host;
    const index_host: number = this.lobby.players.findIndex((player) => player.id === new_host_id);

    this.lobby.players[index_host].host = true;
  }

  createSortedPlayers(lobby: Lobby) {
    let players = lobby.players;
    players.sort(function (a, b) {
      return a.flagy - b.flagy;
    });
    return players;
  }

  changeColor(playerId: string) {
    if (playerId !== this.playerid) return;
    this.colorChangingService.changeColor(this.lobby!, this.token, this.socket);
  }

  leave() {
    this.lobbyService.leave(this.socket);
  }
}
