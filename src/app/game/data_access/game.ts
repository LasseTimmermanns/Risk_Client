import { Player } from './player';
import { SettingsState } from '../../shared/data_access/settings';
import { GameTerritory } from './territory';

export class Game {
  id: String;
  mapId: String;
  players: Player[];
  territories: GameTerritory[];
  move: number;
  settings: SettingsState;

  constructor(
    id: string,
    mapId: string,
    players: Player[],
    territories: GameTerritory[],
    move: number,
    settings: SettingsState
  ) {
    this.id = id;
    this.mapId = mapId;
    this.players = players;
    this.territories = territories;
    this.move = move;
    this.settings = settings;
  }
}
