import { Color } from "../Settings/Color";
import { LobbyPlayer } from "./LobbyPlayer";

export class Lobby{
  id: string;
  mapId: string;
  maxPlayers: number;
  turnTimer: number;
  cardBonus: string;
  isPublic: boolean;
  usedColors: Color[] = [];
  players: LobbyPlayer[]

  constructor(id: string, mapId: string, maxPlayers: number, turnTimer: number, cardBonus: string, isPublic: boolean, players: LobbyPlayer[]){
    this.id = id;
    this.mapId = mapId;
    this.maxPlayers = maxPlayers;
    this.turnTimer = turnTimer;
    this.cardBonus = cardBonus;
    this.isPublic = isPublic;
    this.players = players;
  }
}
