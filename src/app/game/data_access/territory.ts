export interface MapTerritory {
  name: string;
  path: string;
  id: number;
  centerX: number;
  centerY: number;
  borders: number[];
}

export interface GameTerritory {
  id: number;
  troops: number;
  owner: string;
}
