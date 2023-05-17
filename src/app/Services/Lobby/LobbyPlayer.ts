export class LobbyPlayer{
  color: string;
  name: string;
  position: number;

  constructor(ccolor: string, cname: string, cposition: number){
    this.color = ccolor;
    this.name = cname;
    this.position = cposition;
  }
}
