import { Player } from './player';
import { GameTerritory, MapTerritory } from './territory';

export class DrawInformation {
  public mapTerritory: MapTerritory;
  public gameTerritory: GameTerritory;
  public owner: Player;
  public displayName: string;

  constructor(
    mapTerritory: MapTerritory,
    gameTerritory: GameTerritory,
    owner: Player,
    displayName: string
  ) {
    this.mapTerritory = mapTerritory;
    this.gameTerritory = gameTerritory;
    this.owner = owner;
    this.displayName = displayName;
  }
}
