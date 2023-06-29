import { Lobby } from './../Lobby';
import { Injectable } from '@angular/core';
import { Color, ColorChange } from '../../../Objects/Game/color';
import { LobbyWebSocketService } from '../lobby-web-socket.service';
import { HttpClient } from '@angular/common/http';
import { globals } from 'src/app/globals';
import { QueryIdentification } from 'src/app/Components/lobby/QueryIdentification';
import { LobbyPlayer } from '../LobbyPlayer';

@Injectable({
  providedIn: 'root'
})
export class ColorChangingService {

  colors: Color[] = [];
  colorIndex: number = 0;

  constructor(private lobbyWebSocketService: LobbyWebSocketService, private httpClient: HttpClient) {
    this.httpClient.get<Color[]>(`${globals.spring_httpserver}/settings/colors/all`).subscribe(colors => {
      this.colors = colors;
      this.colorIndex =  Math.floor(Math.random()*colors.length)
    });
  }

  colorChanged(colorChange: ColorChange, lobby: Lobby ){
    let playerIndex = lobby.players.findIndex(player => player.id === colorChange.playerid);
    lobby.players[playerIndex].color = colorChange.color;
  }


  colorIsFree(color: string, players: LobbyPlayer[]){
    for(let i = 0; i < players.length; i++){
      if(players[i].color.hex == color)
        return false;
    }
    return true;
  }

  changeColor(players: LobbyPlayer[], queryIdentification: QueryIdentification){
    var color;
    do{
      this.colorIndex++;
      if(this.colorIndex >= this.colors.length) this.colorIndex = 0;
      color = this.colors[this.colorIndex];
    }while(!this.colorIsFree(color.hex, players))

    const data = {"lobbyid": queryIdentification.roomid, "token": queryIdentification.token, "hex": color.hex};
    this.lobbyWebSocketService.sendMessage(queryIdentification.socket, this.lobbyWebSocketService.createMessage("color_change", data))
  }


}
