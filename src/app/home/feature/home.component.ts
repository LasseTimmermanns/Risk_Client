import { Component } from '@angular/core';
import { LobbyNavigationService } from 'src/app/home/utils/lobby-navigation/lobby-navigation.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private lobbyNavigationService: LobbyNavigationService) {}

  createGame() {
    this.lobbyNavigationService.createGame();
  }

  findGames() {
    this.lobbyNavigationService.findGames();
  }
}
