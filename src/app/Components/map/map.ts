import { Territory } from "../territory/territory";

export class Map{
  width: number;
  height: number;
  territories: Territory[];
  name: string;

  constructor(width: number, height: number, territories: Territory[], name: string){
    this.width = width;
    this.height = height;
    this.territories = territories;
    this.name = name;
  }
}
