import { Color } from "../Settings/Color";

export class LobbyPlayer{
  id: string;
  color: Color;
  name: string;
  position: number;

  constructor(id: string, color: Color, name: string, position: number){
    this.id = id;
    this.color = color;
    this.name = name;
    this.position = position;
  }
}
