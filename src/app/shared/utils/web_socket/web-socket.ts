import { Router } from '@angular/router';
export class WebSocketHelper {
  static createMessage(event: string, data: any) {
    const obj = { event: event, data: data };
    return JSON.stringify(obj);
  }

  static createEventMessage(event: any) {
    const obj = { event: event };
    return JSON.stringify(obj);
  }

  static redirectOnSocketClose(socket: WebSocket, router: Router) {
    socket.onclose = (event) => {
      router.navigate(['']);
    };
  }
}
