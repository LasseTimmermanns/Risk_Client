import { Color } from "./Color";

export class ColorChange{
  playerid: string;
  color: Color;

  constructor(playerid: string, color: Color){
    this.playerid = playerid;
    this.color = color;
  }
}
