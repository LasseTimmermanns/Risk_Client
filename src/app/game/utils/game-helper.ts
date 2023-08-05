import { Game } from '../data_access/game';

export class GameHelper {
  static getPlayerOnTurn(game: Game) {
    const turn = game.turn;
    const playerCount = game.players.length;

    const currentSeat = turn % playerCount;

    const currentPlayer = game.players.find(
      (player) => player.seat === currentSeat
    );

    if (!currentPlayer) throw Error('CurrentPlayer not found');

    return currentPlayer;
  }
}
