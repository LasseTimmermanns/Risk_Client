import { Color } from "../../Objects/Game/color";
import { LobbyPlayer } from "./LobbyPlayer";

export class Lobby{
  id: string;
  map_id: string;
  max_players: number;
  turn_timer: number;
  is_fixed: boolean;
  is_public: boolean;
  usedColors: Color[] = [];
  players: LobbyPlayer[]

  constructor(id: string, map_id: string, max_players: number, turn_timer: number, is_fixed: boolean, is_public: boolean, players: LobbyPlayer[]){
    this.id = id;
    this.map_id = map_id;
    this.max_players = max_players;
    this.turn_timer = turn_timer;
    this.is_fixed = is_fixed;
    this.is_public = is_public;
    this.players = players;
  }
}
