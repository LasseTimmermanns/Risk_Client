import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColorChangingService } from 'src/app/Services/Lobby/Color/color-changing.service';
import { Lobby } from 'src/app/Services/Lobby/Lobby';
import { LobbyPlayer } from 'src/app/Services/Lobby/LobbyPlayer';
import { LobbyService } from 'src/app/Services/Lobby/lobby.service';
import { DisplayMap } from './DisplayMap';
@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss', './playerstyle.scss', './lobby_responsive.scss', './map.scss']
})
export class LobbyComponent {

  drawPlayers: boolean = true;
  lobby?: Lobby;
  lobbyid?: string;
  sortedPlayers: LobbyPlayer[] = [];
  openSlots: number[] = [];
  token: string = "";
  display_map?: DisplayMap;
  socket!: WebSocket;


  names = ["Lasse", "Sverre", "Timon", "Jojo", "Jan", "Alex", "Levin", "Mats", "Erik", "Caspar"]

  @ViewChild('content') contentRef!: ElementRef;

  constructor(private route: ActivatedRoute, private router: Router, private lobbyService : LobbyService,
       private colorChangingService: ColorChangingService){}

  ngAfterViewInit(): void {
    this.route.params.subscribe(params=>{
      this.lobbyid = params['lobbyid'];
      let name = this.names[Math.floor(Math.random() * this.names.length)];
      this.socket = this.connect(this.lobbyid!, name);
      this.receiveMessages(this.socket);
      this.redirectOnSocketClose(this.socket);
    })
  }

  connect(lobbyid: string, playername: string): WebSocket {
    return new WebSocket(`ws://localhost:8080/lobby?lobby=${lobbyid}&playername=${playername}`);
  }

  switchView(){
    this.drawPlayers = !this.drawPlayers;
  }

  redirectOnSocketClose(socket: WebSocket){
    socket.onclose = (event) => {
      console.log("closed")
      // this.router.navigate([""]);
    }
  }

  receiveMessages(socket: WebSocket): void {
    socket.onmessage = (event) => {
      let data = JSON.parse(event.data);
      let eventType = data.event;

      console.log(data.data)

      switch (eventType) {
        case "declined":
          console.log("Declined")
          break;
        case "join_accepted":
          this.joinAccepted(data.data);
          this.initializeMap(data.data)
          break;
        case "join":
          this.playerJoin(data.data);
          break;
        case "player_quit":
          this.playerQuit(data.data);
          break;
        case "token_granted":
          this.tokenGranted(data.data);
          break;
        case "privacy_change":
          this.privacyChanged(data.data);
          break;
        case "color_change":
          this.colorChangingService.colorChanged(data.data, this.lobby!);
          break;
        default:
          console.log(data)
          break;
      }
    };
  }

  tokenGranted(data: any){
    this.token = data.token;
  }

  joinAccepted(data: Lobby){
    this.lobby = data;
    this.sortedPlayers = this.createSortedPlayers(data);
    this.updateOpenSlots();
  }

  initializeMap(data: Lobby){
    console.log("I want " + data.mapId)
    this.lobbyService.getDisplayPath(data.mapId).subscribe(res => {
      this.display_map = res
      console.log(res)
    })
  }

  privacyChanged(data: any){
    this.lobby!.isPublic = data.isPublic;
  }

  changePrivacy(){
    this.lobbyService.changePrivacy(this.lobbyid!, !this.lobby!.isPublic, this.token, this.socket)
  }

  playerJoin(data: LobbyPlayer){
    this.lobby?.players.push(data);
    this.updateOpenSlots();
  }

  playerQuit(data: any){
    console.log("Quit with following data")
    console.log(data)
    let id = data.id;
    const index = this.lobby?.players.findIndex((player) => player.id === id);

    if (index != -1)
      this.lobby?.players.splice(index!, 1);

    this.updateOpenSlots();
  }

  createSortedPlayers(lobby: Lobby){
    let players = lobby.players;
    players.sort(function(a, b) {
      return a.position - b.position;
    });
    return players;
  }

  updateOpenSlots(){
    let openSlotsN = this.lobby!.maxPlayers - this.lobby!.players.length;
    this.openSlots = Array(openSlotsN).fill(0);
  }


  changeColor(){
    this.colorChangingService.changeColor(this.lobby!, this.token, this.socket);
  }

  leave(){
    this.lobbyService.leave(this.socket)
  }

}
