export class PanningHelper {
  static getPanSizes(sizes: any) {
    return {
      w: sizes.viewBox.width * sizes.realZoom,
      h: sizes.viewBox.height * sizes.realZoom,
    };
  }

  static getBoundaries(panWidth: number, panHeight: number, watchable: number) {
    const zoomedX = {
      minX: -panWidth + window.innerWidth * watchable,
      maxX: window.innerWidth * (1 - watchable),
    };

    const zoomedY = {
      minY: -panHeight + window.innerHeight * watchable,
      maxY: window.innerHeight * (1 - watchable),
    };

    const normalX = {
      minX: -panWidth * (1 - watchable),
      maxX: window.innerWidth - panWidth * watchable,
    };

    const normalY = {
      minY: -panHeight * (1 - watchable),
      maxY: window.innerHeight - panHeight * watchable,
    };

    const isXZoomed = zoomedX.maxX > normalX.maxX;
    const isYZoomed = zoomedY.maxY > normalY.maxY;

    const objX = isXZoomed ? zoomedX : normalX;
    const objY = isYZoomed ? zoomedY : normalY;

    return { ...objX, ...objY };
  }

  static restrictPan(panZoomMap: any, newPan: any, watchable: number) {
    const sizes = this.getPanSizes(panZoomMap.getSizes());

    const boundaries: any = this.getBoundaries(sizes.w, sizes.h, watchable);

    var customPan = {
      x: newPan.x,
      y: newPan.y,
    };

    if (newPan.x < boundaries.minX) customPan.x = boundaries.minX;
    if (newPan.y < boundaries.minY) customPan.y = boundaries.minY;

    if (newPan.x > boundaries.maxX) customPan.x = boundaries.maxX;
    if (newPan.y > boundaries.maxY) customPan.y = boundaries.maxY;

    return customPan;
  }
}
