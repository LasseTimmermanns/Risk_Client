import { SettingsState } from '../../shared/data_access/settings';
import { Player } from './player';
import { GameTerritory } from './territory';

export interface Game {
  id: string;
  mapId: string;
  players: Player[];
  territories: GameTerritory[];
  turn: number;
  phase: number;
  settings: SettingsState;
}
