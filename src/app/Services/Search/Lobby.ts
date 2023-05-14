export class Lobby{
  private id: string;
  private playerCount: number;
  private maxPlayers: number;
  private mapId: string;

  constructor(cid: string, cplayerCount: number, cmaxPlayers: number, cmapId: string){
    this.id = cid;
    this.playerCount = cplayerCount;
    this.maxPlayers = cmaxPlayers;
    this.mapId = cmapId;
  }
}
