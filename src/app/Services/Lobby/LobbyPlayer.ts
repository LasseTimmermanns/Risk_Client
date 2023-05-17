import { Color } from "../Settings/Color";

export class LobbyPlayer{
  color: Color;
  name: string;
  position: number;

  constructor(color: Color, name: string, position: number){
    this.color = color;
    this.name = name;
    this.position = position;
  }
}
