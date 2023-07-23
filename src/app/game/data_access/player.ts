import { Color } from '../../shared/data_access/color';
import { Shape } from './shape';

export interface Player {
  id: string;
  name: string;
  color: Color;
  seat: number;
  cards: number[];
  shape: Shape;
}

export interface DisplayPlayer {
  id: string;
  name: string;
  color: Color;
  seat: number;
  cards: number;
  territoryCount: number;
  troopCount: number;
}
