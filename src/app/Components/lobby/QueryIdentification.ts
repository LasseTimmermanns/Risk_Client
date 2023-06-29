export class QueryIdentification{
  public roomid: string;
  public token: string;
  public socket: WebSocket;

  constructor(lobbyid: string, token: string, socket: WebSocket){
    this.roomid = lobbyid;
    this.token = token;
    this.socket = socket;
  }
}
