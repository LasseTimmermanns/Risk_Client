import { Component } from '@angular/core';
import { GameService } from 'src/app/game/utils/game.service';
import { PlayerDisplayService } from 'src/app/game/utils/player-display.service';

@Component({
  selector: 'app-player-display',
  templateUrl: './player-display.component.html',
  styleUrls: ['./player-display.component.scss'],
})
export class PlayerDisplayComponent {
  constructor(
    public playerDisplayService: PlayerDisplayService,
    public gameService: GameService
  ) {}
}
