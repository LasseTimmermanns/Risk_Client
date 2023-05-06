export class Territory{

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
