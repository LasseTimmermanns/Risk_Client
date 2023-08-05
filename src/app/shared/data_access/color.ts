export interface Color {
  hex: string;
  secondaryHex: string;
  highlightHex: string;
  id: string;
  textColor: string;
}

export class ColorChange {
  playerId: string;
  color: Color;

  constructor(playerId: string, color: Color) {
    this.playerId = playerId;
    this.color = color;
  }
}
