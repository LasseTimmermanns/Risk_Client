import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LobbyNavigationService } from 'src/app/Services/LobbyNavigation/lobby-navigation.service';
import { globals } from 'src/app/globals';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

  constructor(private lobbyNavigationService : LobbyNavigationService){}

  createGame(){
    this.lobbyNavigationService.createGame();
  }

  findGames(){
    this.lobbyNavigationService.findGames();
  }
}
