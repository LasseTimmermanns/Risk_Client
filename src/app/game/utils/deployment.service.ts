import { Injectable } from '@angular/core';
import { QueryIdentification } from 'src/app/shared/data_access/query-identification';
import { WebSocketHelper } from 'src/app/shared/utils/web_socket/web-socket';
import { Player } from '../data_access/player';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root',
})
export class DeploymentService {
  constructor(private gameService: GameService) {}

  private isDeploymentPhase() {
    return this.gameService.game?.phase === 0;
  }

  private getPlayerById(playerId: string): Player {
    const player = this.gameService.game?.players.find(
      (p) => p.id === playerId
    );

    if (!player) throw Error('Player not found');
    return player;
  }

  getTroopsLeft(playerId: string) {
    if (!this.isDeploymentPhase)
      throw Error('getTroopsLeft not in Deployment Phase');

    return this.getPlayerById(playerId).deploymentLeft;
  }

  setTroopsLeft(playerId: string, amount: number) {
    const player = this.getPlayerById(playerId);
    player.deploymentLeft = amount;
  }

  submitDeploy(
    value: number,
    territoryId: number,
    queryIdentification: QueryIdentification
  ) {
    const data = {
      amount: value,
      territoryId: territoryId,
    };
    let msg = WebSocketHelper.createGameActionMessage(
      'deploy',
      queryIdentification,
      data
    );
    queryIdentification.socket.send(msg);
  }

  deploymentReceived(territoryId: number, amount: number) {
    const territory = this.gameService.game?.territories.find(
      (t) => t.id === territoryId
    );

    if (!territory) throw Error('Territory not found with id ' + territoryId);

    this.getPlayerById(territory.owner).deploymentLeft += -amount;
    territory.troops += amount;
  }
}
