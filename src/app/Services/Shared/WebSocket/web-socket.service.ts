import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  constructor(private router: Router) { }

  redirectOnSocketClose(socket: WebSocket) {
    socket.onclose = (event) => {
      this.router.navigate(['']);
    };
  }
}
