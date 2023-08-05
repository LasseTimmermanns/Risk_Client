export function clearCanvas(ctx: CanvasRenderingContext2D) {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  ctx.clearRect(0, 0, w, h);
}

export function setCanvasSize(
  width: number,
  height: number,
  ctx: CanvasRenderingContext2D
) {
  ctx.canvas.width = width;
  ctx.canvas.height = height;
}
