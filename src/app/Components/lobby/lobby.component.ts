import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lobby } from 'src/app/Services/Lobby/Lobby';
import { LobbyPlayer } from 'src/app/Services/Lobby/LobbyPlayer';
import { LobbyService } from 'src/app/Services/Lobby/lobby.service';
import { Color } from 'src/app/Services/Settings/Color';
import { ColorChange } from 'src/app/Services/Settings/ColorChange';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss', './playerstyle.scss']
})
export class LobbyComponent {

  drawPlayers: boolean = true;
  lobby?: Lobby;
  lobbyid?: string;
  sortedPlayers: LobbyPlayer[] = [];
  colors: Color[] = [];
  openSlots: number[] = [];
  token: string = "";
  socket!: WebSocket;


  colorIndex: number = 0;

  @ViewChild('content') contentRef!: ElementRef;

  constructor(private route: ActivatedRoute, private router: Router, private lobbyService : LobbyService){
    this.lobbyService.getAllColors().subscribe(colors => {
      this.colors = colors;
      console.log("Colors: " + colors);
      this.colorIndex =  Math.floor(Math.random()*colors.length)
    })
  }

  ngAfterViewInit(): void {
    this.route.params.subscribe(params=>{
      this.lobbyid = params['lobbyid'];
      this.socket = this.connect(this.lobbyid!, "lasse");
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

  sendMessage(socket: WebSocket, data: string){
    socket.send(data);
  }

  createMessage(event: string, data: string){
    return `{"event":"${event}","data":${data}}`;
  }

  receiveMessages(socket: WebSocket): void {
    socket.onmessage = (event) => {
      let data = JSON.parse(event.data);
      let eventType = data.event;

      console.log("received something")

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
        case "color_change":
          this.colorChanged(data.data);
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

  colorIsFree(color: string){
    const players = this.lobby!.players;
    for(let i = 0; i < players.length; i++){
      if(players[i].color.hex == color)
        return false;
    }
    return true;
  }

  changeColor(){
    console.log("Change Color");
    var color;
    console.log(this.colors)
    do{
      this.colorIndex++;
      if(this.colorIndex >= this.colors.length) this.colorIndex = 0;
      color = this.colors[this.colorIndex];
    }while(!this.colorIsFree(color.hex))

    const data = `{"lobbyid":"${this.lobbyid}","token":"${this.token}","hex":"${color.hex}"}`;
    this.sendMessage(this.socket, this.createMessage("color_change", data))
    console.log("Sent: " + this.createMessage("color_change", data));
  }

  colorChanged(colorChange: ColorChange ){
    console.log("Player changed color")

    let playerIndex = this.lobby!.players.findIndex(player => player.id === colorChange.playerid);
    this.lobby!.players[playerIndex].color.hex = colorChange.color;
  }
}
