export class DisplayMap{

  id: string;
  name: string;
  width: number;
  height: number;
  display_path: string;

  constructor(id: string, name: string, width: number, height: number, display_path: string){
    this.id = id;
    this.name = name;
    this.width = width;
    this.height = height;
    this.display_path = display_path;
    console.log("HGEY" + this.display_path)
  }

}
