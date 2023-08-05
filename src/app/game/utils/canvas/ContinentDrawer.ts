import { ElementRef } from '@angular/core';
import { Continent } from '../../data_access/continent';
import { Map } from '../../data_access/map';
import { MapTerritory } from '../../data_access/territory';
import { drawCenteredText } from './TextDrawer';

function drawContinents(
  map: Map,
  cntCnv: ElementRef<HTMLCanvasElement>,
  drawAsOverlay: boolean,
  ctx?: CanvasRenderingContext2D
) {
  const cntCtx = cntCnv.nativeElement.getContext('2d');

  if (!cntCtx) throw Error('ContinentCanvas, Context cannot be found!');

  cntCtx.canvas.width = map.svgWidth;
  cntCtx.canvas.height = map.svgHeight;
  for (let i = 0; i < map.continents.length; i++) {
    const continent = map.continents[i];
    drawContinent(continent, map.territories, cntCtx, drawAsOverlay);
  }

  if (drawAsOverlay) ctx!.drawImage(cntCnv.nativeElement, 0, 0);
}

export function drawContinentView(
  map: Map,
  cntCnv: ElementRef<HTMLCanvasElement>
) {
  drawContinents(map, cntCnv, false);
}

export function drawContinentOverlay(
  map: Map,
  cntCnv: ElementRef<HTMLCanvasElement>,
  ctx: CanvasRenderingContext2D
) {
  drawContinents(map, cntCnv, true, ctx);
}

export function drawContinent(
  continent: Continent,
  territories: MapTerritory[],
  ctx: CanvasRenderingContext2D,
  drawAsOverlay: boolean
) {
  const continentTerritories = territories.filter((t) =>
    continent.territories.includes(t.id)
  );

  const continentPath = new Path2D();

  continentTerritories.forEach((t) =>
    continentPath.addPath(new Path2D(t.path))
  );

  ctx.save();
  ctx.beginPath();
  ctx.lineWidth = 20;
  ctx.strokeStyle = '#000';
  ctx.stroke(continentPath);
  ctx.fillStyle = continent.hex;
  if (drawAsOverlay) ctx.globalCompositeOperation = 'destination-out';
  ctx.fill(continentPath, 'evenodd');
  ctx.restore();

  if (!drawAsOverlay)
    drawCenteredText(
      continent.displayName.toUpperCase(),
      '26px "Passion One", cursive',
      continent.centerX,
      continent.centerY,
      ctx
    );
}
