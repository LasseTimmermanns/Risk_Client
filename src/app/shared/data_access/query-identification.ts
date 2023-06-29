export class QueryIdentification {
  public roomId: string;
  public token: string;
  public socket: WebSocket;

  constructor(lobbyId: string, token: string, socket: WebSocket) {
    this.roomId = lobbyId;
    this.token = token;
    this.socket = socket;
  }
}
