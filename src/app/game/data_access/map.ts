import { Continent } from './continent';
import { MapTerritory } from './territory';

export interface Map {
  svgWidth: number;
  svgHeight: number;
  territories: MapTerritory[];
  continents: Continent[];
  id: string;
}
