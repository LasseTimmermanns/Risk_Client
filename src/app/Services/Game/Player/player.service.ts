import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor() {}

  private socket!: WebSocket;
  private messageSubject: Subject<string> = new Subject();

  connect(username: string): void {
    this.socket = new WebSocket(`ws://localhost:8080/players?name=${username}&hey=nay`);
  }

  sendMessage(message: string): void {

    this.socket.onopen = (event) => {
      this.socket.send("LALALALLA");
    };
    this.socket.onmessage = (event) => {
      console.log('Message');
      console.log(event.data);
      console.log(JSON.parse(event.data));
      this.messageSubject.next(event.data);
    };
    this.socket.send(message);
  }

  getMessageSubject(): Subject<string> {
    return this.messageSubject;
  }
}
