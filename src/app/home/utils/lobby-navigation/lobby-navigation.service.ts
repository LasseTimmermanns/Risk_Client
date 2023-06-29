import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { globals } from 'src/app/globals';

@Injectable({
  providedIn: 'root',
})
export class LobbyNavigationService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  createGame() {
    this.httpClient
      .post<any>(`${globals.springHttpServer}/lobbies/create`, {})
      .subscribe((res) => {
        this.joinGame(res.lobbyId);
      });
  }

  joinGame(lobbyId: string) {
    this.router.navigate([`/lobby/${lobbyId}`]);
  }

  findGames() {
    this.router.navigate(['/explore']);
  }
}
