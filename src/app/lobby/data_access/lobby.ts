import { LobbyPlayer } from './lobby-player';

export class Lobby {
  id: string;
  mapId: string;
  maxPlayers: number;
  turnTimer: number;
  isFixed: boolean;
  isPublic: boolean;
  players: LobbyPlayer[];

  constructor(
    id: string,
    mapId: string,
    maxPlayers: number,
    turnTimer: number,
    isFixed: boolean,
    isPublic: boolean,
    players: LobbyPlayer[]
  ) {
    this.id = id;
    this.mapId = mapId;
    this.maxPlayers = maxPlayers;
    this.turnTimer = turnTimer;
    this.isFixed = isFixed;
    this.isPublic = isPublic;
    this.players = players;
  }
}
