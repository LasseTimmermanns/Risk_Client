export class Color {
  public hex: string;
  public name: string;
  public textColor: string;

  constructor(hex: string, name: string, text_color: string) {
    this.hex = hex;
    this.name = name;
    this.textColor = text_color;
  }
}

export class ColorChange {
  playerId: string;
  color: Color;

  constructor(playerId: string, color: Color) {
    this.playerId = playerId;
    this.color = color;
  }
}
