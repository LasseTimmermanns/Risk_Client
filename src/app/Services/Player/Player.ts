export class Player{
  name: string;
  color: string;
  territories: number[];

  constructor(cname: string, ccolor: string, cterritories: number[]){
    this.name = cname;
    this.color = ccolor;
    this.territories = cterritories;
  }
}
