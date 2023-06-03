import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LobbyWebSocketService {

  constructor() { }

  sendMessage(socket: WebSocket, data: string){
    socket.send(data);
  }

  createMessage(event: string, data: string){
    return `{"event":"${event}","data":${data}}`;
  }

  createEventMessage(event: string){
    return `{"event":"${event}"}`
  }
}
