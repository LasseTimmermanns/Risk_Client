export class QueryIdentification{
  public lobbyid: string;
  public token: string;
  public socket: WebSocket;

  constructor(lobbyid: string, token: string, socket: WebSocket){
    this.lobbyid = lobbyid;
    this.token = token;
    this.socket = socket;
  }
}
