import { LobbyPlayer } from "./LobbyPlayer";

export class Lobby{
  id: string;
  mapId: string;
  maxPlayers: number;
  turnTimer: number;
  cardBonus: string;
  players: LobbyPlayer[]

  constructor(id: string, mapId: string, maxPlayers: number, turnTimer: number, cardBonus: string, players: LobbyPlayer[]){
    this.id = id;
    this.mapId = mapId;
    this.maxPlayers = maxPlayers;
    this.turnTimer = turnTimer;
    this.cardBonus = cardBonus;
    this.players = players;
  }
}
