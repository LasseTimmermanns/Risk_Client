import { Color } from "../Settings/Color";

export class Player{
  name: string;
  color: Color;
  territories: number[];

  constructor(name: string, color: Color, territories: number[]){
    this.name = name;
    this.color = color;
    this.territories = territories;
  }
}
