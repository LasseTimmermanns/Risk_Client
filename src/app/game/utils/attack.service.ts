import { Injectable } from '@angular/core';
import { MapTerritory } from '../data_access/territory';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root',
})
export class AttackService {
  constructor(private gameService: GameService) {}

  getPossibleAttacks(mapTerritory: MapTerritory, playerId: string) {
    const hypothetical = mapTerritory.borders;

    const possibleAttacks: number[] = [];

    hypothetical.forEach((id) => {
      const hypotheticalAttackTerritory =
        this.gameService.game?.territories.find((t) => t.id === id);
      if (hypotheticalAttackTerritory?.owner !== playerId)
        possibleAttacks.push(id);
    });

    return possibleAttacks;
  }
}
