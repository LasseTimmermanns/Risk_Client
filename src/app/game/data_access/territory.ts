export interface MapTerritory {
  name: string;
  displayName: string;
  path: string;
  id: number;
  centerX: number;
  centerY: number;
  targetX: number;
  targetY: number;
  borders: number[];
}

export interface GameTerritory {
  id: number;
  troops: number;
  owner: string;
}
