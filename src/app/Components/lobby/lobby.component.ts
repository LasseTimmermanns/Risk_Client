import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColorChangingService } from 'src/app/Services/Lobby/Color/color-changing.service';
import { Lobby } from 'src/app/Services/Lobby/Lobby';
import { LobbyPlayer } from 'src/app/Services/Lobby/LobbyPlayer';
import { LobbyService } from 'src/app/Services/Lobby/lobby.service';
import { Color } from 'src/app/Services/Settings/Color';
import { ColorChange } from 'src/app/Services/Settings/ColorChange';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss', './playerstyle.scss', './lobby_responsive.scss']
})
export class LobbyComponent {

  drawPlayers: boolean = true;
  lobby?: Lobby;
  lobbyid?: string;
  sortedPlayers: LobbyPlayer[] = [];
  openSlots: number[] = [];
  token: string = "";
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
      this.router.navigate([""]);
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
          this.router.navigate([""]);
          break;
        case "join_accepted":
          this.joinAccepted(data.data);
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
    this.adjustPlayerNameFontSizes();
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

  adjustPlayerNameFontSizes(){
    console.log("Adjusting FontSizes")
    console.log(this.contentRef)
    let textElements = this.contentRef.nativeElement.querySelectorAll('.playername');

    console.log(textElements)

    for(let i = 0; i < textElements.length; i++){
      this.adjustFontSize(textElements[i], textElements[i].parentNode)
    }

  }

  adjustFontSize(textElement: any, container: any){
    const maxWidth = container.offsetWidth * 0.95;
    const maxHeight = container.offsetHeight * 0.95;

    let fontSize = 32; // Starting font size
    let textWidth, textHeight;

    console.log("adjusting");

    do {
      fontSize--;
      textElement.style.fontSize = fontSize + 'px';

      // Measure the width and height of the text element
      textWidth = textElement.offsetWidth;
      textHeight = textElement.offsetHeight;
    } while((textWidth > maxWidth || textHeight > maxHeight) && fontSize > 0);
  }

  changeColor(){
    this.colorChangingService.changeColor(this.lobby!, this.token, this.socket);
  }

  leave(){
    this.lobbyService.leave(this.socket)
  }

}
