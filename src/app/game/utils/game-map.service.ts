import { Injectable } from '@angular/core';
import { DrawInformation } from '../data_access/drawInformation';
import { Player } from '../data_access/player';
import { GameTerritory, MapTerritory } from '../data_access/territory';
import { GameMapHelper } from './game-map-helper';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root',
})
export class GameMapService {
  drawInformations: DrawInformation[] = [];

  constructor(private gameService: GameService) {}

  public generateDrawInformation() {
    var drawInformations: DrawInformation[] = [];
    for (let i = 0; i < this.gameService.map!.territories.length; i++) {
      const mapTerritory = this.getMapTerritory(i);
      const gameTerritory = this.getGameTerritory(i);
      const owner = this.getOwner(i);
      const displayName = mapTerritory?.displayName;

      if (!mapTerritory || !gameTerritory || !owner || !displayName)
        throw Error('Cant create drawInformations for index ' + i);

      drawInformations.push(
        new DrawInformation(mapTerritory, gameTerritory, owner, displayName)
      );
      this.drawInformations = drawInformations;
    }
  }

  private getOwner(territoryId: number): Player | undefined {
    if (!this.gameService.game?.players || !this.gameService.game.territories)
      return;
    return GameMapHelper.getOwner(
      territoryId,
      this.gameService.game.players,
      this.gameService.game.territories
    );
  }

  private getGameTerritory(territoryId: number): GameTerritory | undefined {
    if (!this.gameService.game?.players || !this.gameService.game.territories)
      return;
    return GameMapHelper.getGameTerritory(
      territoryId,
      this.gameService.game.territories
    );
  }

  private getMapTerritory(territoryId: number): MapTerritory | undefined {
    return this.gameService.map?.territories.find((t) => t.id === territoryId);
  }
}
