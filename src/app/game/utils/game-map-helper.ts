import { Player } from '../data_access/player';
import { GameTerritory } from '../data_access/territory';

export class GameMapHelper {
  static getOwner(
    territoryId: number,
    players: Player[],
    territories: GameTerritory[]
  ) {
    const territory = this.getGameTerritory(territoryId, territories);
    if (!territory) return;

    const owner = players.find((p) => p.id == territory.owner);

    if (!owner) {
      console.error('No Owner found with id ' + territory.owner);
      return;
    }

    return owner;
  }

  static getGameTerritory(territoryId: number, territories: GameTerritory[]) {
    const territory = territories.find((t) => t.id == territoryId);
    if (!territory) {
      console.error('No Territory found with id ' + territoryId);
      return;
    }
    return territory;
  }
}
