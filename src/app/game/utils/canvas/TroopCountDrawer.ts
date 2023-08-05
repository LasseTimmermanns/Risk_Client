import { DrawInformation } from '../../data_access/drawInformation';
import { MyClass } from '../../ui/canvas-map/MyClass';
import { drawCenteredText } from './TextDrawer';

var shapeDimensions = [64, 64];

export function drawTroopCounts(
  drawInformations: DrawInformation[],
  ctx: CanvasRenderingContext2D,
  selectedTerritoryId?: number
) {
  var drawnTroopCounts = [];
  for (let i = 0; i < drawInformations.length; i++) {
    const drawInformation = drawInformations[i];
    const territoryIsHighlighted =
      drawInformation.mapTerritory.id === selectedTerritoryId;
    drawnTroopCounts.push(drawTroopCount(drawInformation, ctx));
  }
  return drawnTroopCounts;
}

export function drawTroopCount(
  drawInformation: DrawInformation,
  ctx: CanvasRenderingContext2D
) {
  const cx = drawInformation.mapTerritory.centerX;
  const cy = drawInformation.mapTerritory.centerY;

  const path = drawInformation.owner.shape.path;
  const hex = drawInformation.owner.color.secondaryHex;
  const shapePath = drawShape(path, hex, cx, cy, ctx);

  const text = drawInformation.gameTerritory.troops.toString();
  const font = '26px "Passion One", cursive';
  drawCenteredText(text, font, cx, cy, ctx);

  return new MyClass(shapePath, drawInformation);
}

export function drawShape(
  path: string,
  hex: string,
  cx: number,
  cy: number,
  ctx: CanvasRenderingContext2D
) {
  cx += -shapeDimensions[0] / 2;
  cy += -shapeDimensions[1] / 2;
  const shape = new Path2D(path);
  const translatedPath = new Path2D();
  translatedPath.addPath(shape, { e: cx, f: cy });

  ctx.beginPath();
  ctx.fillStyle = hex;
  ctx.fill(translatedPath);

  return translatedPath;
}
