import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lobby } from 'src/app/Services/Lobby/Lobby';
import { LobbyPlayer } from 'src/app/Services/Lobby/LobbyPlayer';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss', './playerstyle.scss']
})
export class LobbyComponent {

  drawPlayers: boolean = true;
  lobby?: Lobby;
  sortedPlayers: LobbyPlayer[] = [];
  openSlots: number[] = [];
  token: string = "";
  socket!: WebSocket;

  @ViewChild('content') contentRef!: ElementRef;

  constructor(private route: ActivatedRoute, private router: Router, private elem: ElementRef){}

  ngAfterViewInit(): void {
    this.route.params.subscribe(params=>{
      this.socket = this.connect(params['lobbyid'], "lasse");
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

  playerJoin(data: LobbyPlayer){
    this.lobby?.players.push(data);
    this.updateOpenSlots();
  }

  playerQuit(data: any){
    let playername = data.playername;
    const index = this.lobby?.players.findIndex((player) => player.name === playername);

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
}
