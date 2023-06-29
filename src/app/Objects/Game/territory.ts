export class MapTerritory{
  name: string;
  path: string;
  id: number;
  borders: number[];

  constructor(name: string, path: string, id: number, borders: number[]){
    this.name = name;
    this.path = path;
    this.id = id;
    this.borders = borders;
  }

}

export class GameTerritory{
  id: number;
  troops: number;
  owner: string;

  constructor(id: number, troops: number, owner: string){
    this.id = id;
    this.troops = troops;
    this.owner = owner;
  }
}
