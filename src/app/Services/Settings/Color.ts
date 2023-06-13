export class Color{
  public hex : string;
  public name : string;
  public text_color : string;

  constructor(hex: string, name: string, text_color: string){
    this.hex = hex;
    this.name = name;
    this.text_color = text_color;
  }
}
