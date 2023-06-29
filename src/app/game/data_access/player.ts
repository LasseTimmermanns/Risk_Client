import { Color } from '../../shared/data_access/color';

export class Player {
  id: string;
  name: string;
  color: Color;
  seat: number;
  cards: number[];

  constructor(
    id: string,
    name: string,
    color: Color,
    seat: number,
    cards: number[]
  ) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.seat = seat;
    this.cards = cards;
  }
}
