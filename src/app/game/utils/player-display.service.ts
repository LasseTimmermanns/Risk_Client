import { Injectable } from '@angular/core';
import { DisplayPlayer } from '../data_access/player';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerDisplayService {
  constructor(private gameService: GameService) {}

  displayPlayers: DisplayPlayer[] = [];

  generateDisplayPlayers() {
    if (!this.gameService.game) return;
    var displayPlayers: DisplayPlayer[] = [];

    this.gameService.game.players.forEach((player) => {
      const displayPlayer: DisplayPlayer = {
        id: player.id,
        name: player.name,
        color: player.color, // Assuming "blue" is a valid Color value
        seat: player.seat,
        cards: player.cards.length,
        territoryCount: 0,
        troopCount: 0,
      };

      displayPlayers.push(displayPlayer);
    });

    this.gameService.game.territories.forEach((territory) => {
      const owner = displayPlayers.find(
        (displayPlayer) => displayPlayer.id === territory.owner
      );
      if (owner) {
        owner.territoryCount++;
        owner.troopCount += territory.troops;
      }
    });

    this.displayPlayers = displayPlayers;
  }
}
