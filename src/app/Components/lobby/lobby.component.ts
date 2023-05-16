import { Component } from '@angular/core';
import { PlayerService } from 'src/app/Services/Player/player.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent {

  drawPlayers: boolean = false;

  constructor(private playerService : PlayerService){
    this.playerService.connect("user");
  }

}
