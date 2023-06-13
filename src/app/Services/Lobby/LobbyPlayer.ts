import { Color } from "../Settings/Color";

export class LobbyPlayer{
  id: string;
  color: Color;
  name: string;
  host: boolean;
  position: number;
  flagx: number;
  flagy: number;

  constructor(id: string, color: Color, name: string, host: boolean, position: number, flagx: number, flagy: number){
    this.id = id;
    this.color = color;
    this.name = name;
    this.host = host;
    this.position = position;
    this.flagx = flagx;
    this.flagy = flagy;
  }
}
