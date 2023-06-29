export class DisplayLobby{

  id: string;
  host: string;
  cardBonus: string;
  turnTimer: number;
  playerCount: number;
  maxPlayers: number;
  mapId: string;

  constructor(id: string, host: string, cardBonus: string, turnTimer: number, playerCount: number,
          maxPlayers: number, mapId: string){
    this.id = id;
    this.host = host;
    this.cardBonus = cardBonus;
    this.turnTimer = turnTimer;
    this.playerCount = playerCount;
    this.maxPlayers = maxPlayers;
    this.mapId = mapId;
  }

}
