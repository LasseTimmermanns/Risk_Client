import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LobbyWebSocketService {

  sendMessage(socket: WebSocket, data: string){
    socket.send(data);
  }

  createMessage(event: string, data: any){
    const obj = {"event": event, "data": data}
    return JSON.stringify(obj);
  }

  createEventMessage(event: any){
    const obj = {"event": event}
    return JSON.stringify(obj)
  }
}
