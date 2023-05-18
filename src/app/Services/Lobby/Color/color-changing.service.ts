import { Lobby } from './../Lobby';
import { Injectable } from '@angular/core';
import { ColorChange } from '../../Settings/ColorChange';
import { Color } from '../../Settings/Color';
import { LobbyWebSocketService } from '../lobby-web-socket.service';
import { HttpClient } from '@angular/common/http';
import { globals } from 'src/app/globals';

@Injectable({
  providedIn: 'root'
})
export class ColorChangingService {

  colors: Color[] = [];
  colorIndex: number = 0;

  constructor(private lobbyWebSocketService: LobbyWebSocketService, private httpClient: HttpClient) {
    this.httpClient.get<Color[]>(`${globals.spring_server}/settings/colors/all`).subscribe(colors => {
      this.colors = colors;
      console.log("Colors: " + colors);
      this.colorIndex =  Math.floor(Math.random()*colors.length)
    });
  }

  colorChanged(colorChange: ColorChange, lobby: Lobby ){
    console.log("Player changed color")

    let playerIndex = lobby.players.findIndex(player => player.id === colorChange.playerid);
    lobby.players[playerIndex].color.hex = colorChange.color;
  }


  colorIsFree(color: string, lobby: Lobby){
    const players = lobby.players;
    for(let i = 0; i < players.length; i++){
      if(players[i].color.hex == color)
        return false;
    }
    return true;
  }

  changeColor(lobby: Lobby, token: string, socket: WebSocket){
    var color;
    do{
      this.colorIndex++;
      if(this.colorIndex >= this.colors.length) this.colorIndex = 0;
      color = this.colors[this.colorIndex];
    }while(!this.colorIsFree(color.hex, lobby))

    const data = `{"lobbyid":"${lobby.id}","token":"${token}","hex":"${color.hex}"}`;
    this.lobbyWebSocketService.sendMessage(socket, this.lobbyWebSocketService.createMessage("color_change", data))
  }


}
