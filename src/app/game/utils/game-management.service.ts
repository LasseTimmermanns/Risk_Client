import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QueryIdentification } from 'src/app/shared/data_access/query-identification';
import { WebSocketHelper } from 'src/app/shared/utils/web_socket/web-socket';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root',
})
export class GameManagementService {
  constructor(
    private httpClient: HttpClient,
    private gameService: GameService
  ) {}

  nextPhase(queryIdentification: QueryIdentification) {
    let msg = WebSocketHelper.createEmptyGameActionMessage(
      'nextPhase',
      queryIdentification
    );
    queryIdentification.socket.send(msg);
  }

  onNextPhase() {
    if (this.gameService.game!.phase == 2)
      throw Error('Phase was already Fortify');
    this.gameService.game!.phase += 1;
    this.gameService.updatePlayerOnTurn();
  }

  onNextTurn() {
    this.gameService.game!.phase = 0;
    this.gameService.game!.turn += 1;
    this.gameService.updatePlayerOnTurn();
  }
}
