import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { globals } from 'src/app/globals';
import { Color, ColorChange } from 'src/app/shared/data_access/color';
import { QueryIdentification } from 'src/app/shared/data_access/query-identification';
import { WebSocketHelper } from 'src/app/shared/utils/web_socket/web-socket';
import { Lobby } from '../data_access/lobby';
import { LobbyPlayer } from '../data_access/lobby-player';

@Injectable({
  providedIn: 'root',
})
export class ColorChangingService {
  colors: Color[] = [];
  colorIndex: number = 0;

  constructor(private httpClient: HttpClient) {
    this.httpClient
      .get<Color[]>(`${globals.springHttpServer}/settings/colors/all`)
      .subscribe((colors) => {
        this.colors = colors;
        this.colorIndex = Math.floor(Math.random() * colors.length);
      });
  }

  colorChanged(colorChange: ColorChange, lobby: Lobby) {
    let playerIndex = lobby.players.findIndex(
      (player) => player.id === colorChange.playerId
    );
    console.log(colorChange);
    lobby.players[playerIndex].color = colorChange.color;
  }

  colorIsFree(color: string, players: LobbyPlayer[]) {
    for (let i = 0; i < players.length; i++) {
      if (players[i].color.hex == color) return false;
    }
    return true;
  }

  changeColor(
    players: LobbyPlayer[],
    queryIdentification: QueryIdentification
  ) {
    var color;
    do {
      this.colorIndex++;
      if (this.colorIndex >= this.colors.length) this.colorIndex = 0;
      color = this.colors[this.colorIndex];
    } while (!this.colorIsFree(color.hex, players));

    const data = {
      lobbyId: queryIdentification.roomId,
      token: queryIdentification.token,
      hex: color.hex,
    };

    const msg = WebSocketHelper.createMessage('color_change', data);
    queryIdentification.socket.send(msg);
  }
}
