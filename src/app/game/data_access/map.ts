import { MapTerritory } from './territory';

export class Map {
  svgWidth: number;
  svgHeight: number;
  territories: MapTerritory[];
  id: string;

  constructor(
    svgWidth: number,
    svgHeight: number,
    territories: MapTerritory[],
    id: string
  ) {
    this.svgWidth = svgWidth;
    this.svgHeight = svgHeight;
    this.territories = territories;
    this.id = id;
  }
}
