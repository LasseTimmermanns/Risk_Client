import { Injectable } from '@angular/core';
import { Game } from 'src/app/game/data_access/game';
import { Map } from '../data_access/map';
import { Player } from '../data_access/player';
import { GameHelper } from './game-helper';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor() {}

  map?: Map;
  game?: Game;
  playerOnTurn?: Player;
  thisPlayersTurn: boolean = false;
  playerId?: string;

  updatePlayerOnTurn() {
    this.playerOnTurn = GameHelper.getPlayerOnTurn(this.game!);
    this.thisPlayersTurn = this.playerOnTurn.id === this.playerId;
  }

  updateDisplayNames() {
    this.map!.continents.forEach((c) => {
      c.displayName = c.name.replaceAll('_', ' ');
      console.log(c.name.replaceAll('_', ''));
    });

    this.map!.territories.forEach((t) => {
      t.displayName = t.name.replaceAll('_', '');
    });
  }
}
