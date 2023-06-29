import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  constructor(private router: Router) {}

  redirectOnSocketClose(socket: WebSocket) {
    socket.onclose = (event) => {
      this.router.navigate(['']);
    };
  }

  sendMessage(socket: WebSocket, data: string) {
    socket.send(data);
  }

  createMessage(event: string, data: any) {
    const obj = { event: event, data: data };
    return JSON.stringify(obj);
  }

  createEventMessage(event: any) {
    const obj = { event: event };
    return JSON.stringify(obj);
  }
}
