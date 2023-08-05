export function drawCenteredText(
  text: string,
  font: string,
  cx: number,
  cy: number,
  ctx: CanvasRenderingContext2D
) {
  ctx.beginPath();
  ctx.fillStyle = '#FFF';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = font;
  ctx.fillText(text, cx, cy);
}
