import { MapTerritory } from './territory';

export class Map {
  width: number;
  height: number;
  territories: MapTerritory[];
  name: string;

  constructor(
    width: number,
    height: number,
    territories: MapTerritory[],
    name: string
  ) {
    this.width = width;
    this.height = height;
    this.territories = territories;
    this.name = name;
  }
}
