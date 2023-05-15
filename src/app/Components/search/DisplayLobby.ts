export class DisplayLobby{
  id: string;
  host: string;
  cardBonus: string;
  turnTimer: number;
  playerCount: number;
  maxPlayers: number;
  mapId: string;

  constructor(cid: string, chost: string, ccardBonus: string, cturnTimer: number, cplayerCount: number,
          cmaxPlayers: number, cmapId: string){
    this.id = cid;
    this.host = chost;
    this.cardBonus = ccardBonus;
    this.turnTimer = cturnTimer;
    this.playerCount = cplayerCount;
    this.maxPlayers = cmaxPlayers;
    this.mapId = cmapId;
  }
}
