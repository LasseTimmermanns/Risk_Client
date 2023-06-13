import { Color } from "../Settings/Color";
import { LobbyPlayer } from "./LobbyPlayer";

export class Lobby{
  id: string;
  mapName: string;
  maxPlayers: number;
  turnTimer: number;
  cardBonus: string;
  isPublic: boolean;
  usedColors: Color[] = [];
  players: LobbyPlayer[]

  constructor(id: string, mapName: string, maxPlayers: number, turnTimer: number, cardBonus: string, isPublic: boolean, players: LobbyPlayer[]){
    this.id = id;
    this.mapName = mapName;
    this.maxPlayers = maxPlayers;
    this.turnTimer = turnTimer;
    this.cardBonus = cardBonus;
    this.isPublic = isPublic;
    this.players = players;
  }
}
