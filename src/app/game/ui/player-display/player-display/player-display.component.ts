import { Component, Input } from '@angular/core';
import { DisplayPlayer } from 'src/app/game/data_access/player';

@Component({
  selector: 'app-player-display',
  templateUrl: './player-display.component.html',
  styleUrls: ['./player-display.component.scss'],
})
export class PlayerDisplayComponent {
  @Input('displayPlayers') displayPlayers?: DisplayPlayer[];
  @Input('playerOnTurn') playerOnTurn?: string;
}
