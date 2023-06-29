import { Player } from "./player";
import { SettingsState } from "./settings";
import { GameTerritory } from "./territory";

export class Game{

  id: String;
  map_id: String;
  players: Player[];
  territories: GameTerritory[];
  move: number;
  settings: SettingsState;

  constructor(id: string, map_id: string, players: Player[], territories: GameTerritory[], move: number, settings: SettingsState){
    this.id = id;
    this.map_id = map_id;
    this.players = players;
    this.territories = territories;
    this.move = move;
    this.settings = settings;
  }



}
