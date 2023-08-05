import { DrawInformation } from '../../data_access/drawInformation';
import { MyClass } from '../../ui/canvas-map/MyClass';

export function drawTerritories(
  drawInformations: DrawInformation[],
  ctx: CanvasRenderingContext2D,
  selectedTerritoryId?: number
) {
  var drawnTerritories = [];
  for (let i = 0; i < drawInformations.length; i++) {
    const drawInformation = drawInformations[i];
    const territoryIsHighlighted =
      drawInformation.mapTerritory.id === selectedTerritoryId;
    drawnTerritories.push(
      drawTerritory(drawInformation, ctx, territoryIsHighlighted)
    );
  }
  return drawnTerritories;
}

export function drawTerritory(
  drawInformation: DrawInformation,
  ctx: CanvasRenderingContext2D,
  territoryIsHighlighted: boolean
) {
  ctx.beginPath();
  const path = new Path2D(drawInformation.mapTerritory.path);
  const color = drawInformation.owner.color;

  const fillColor = territoryIsHighlighted ? color.highlightHex : color.hex;
  ctx.fillStyle = fillColor;
  ctx.strokeStyle = color.secondaryHex;
  ctx.lineWidth = 5;
  ctx.fill(path);
  ctx.stroke(path);

  return new MyClass(path, drawInformation);
}
