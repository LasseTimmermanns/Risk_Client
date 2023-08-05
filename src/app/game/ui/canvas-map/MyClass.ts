import { DrawInformation } from './../../data_access/drawInformation';

export class MyClass {
  path: Path2D;
  drawInformation: DrawInformation;

  constructor(path: Path2D, drawInformation: DrawInformation) {
    this.path = path;
    this.drawInformation = drawInformation;
  }
}
