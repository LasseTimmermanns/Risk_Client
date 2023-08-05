import { Component, ElementRef, ViewChild } from '@angular/core';
import { clearCanvas, setCanvasSize } from '../../utils/canvas/CanvasUtils';
import {
  drawContinentOverlay,
  drawContinentView,
} from '../../utils/canvas/ContinentDrawer';
import { drawTerritories } from '../../utils/canvas/TerritoryDrawer';
import { drawTroopCounts } from '../../utils/canvas/TroopCountDrawer';
import { GameMapService } from '../../utils/game-map.service';
import { GameService } from '../../utils/game.service';
import { MyClass } from './MyClass';

@Component({
  selector: 'app-canvas-map',
  templateUrl: './canvas-map.component.html',
  styleUrls: ['./canvas-map.component.scss'],
})
export class CanvasMapComponent {
  @ViewChild('gameMap', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;

  @ViewChild('continentOverlay', { static: true })
  continentCanvas!: ElementRef<HTMLCanvasElement>;

  context?: CanvasRenderingContext2D;
  continentContext?: CanvasRenderingContext2D;

  drawnTerritories: MyClass[] = [];
  drawnTroopCounts: MyClass[] = [];

  showContinentView: boolean = false;

  selectedTerritoryId?: number;

  constructor(
    public gameService: GameService,
    public gameMapService: GameMapService
  ) {}

  ngAfterViewInit(): void {
    const ctx = this.canvas.nativeElement.getContext('2d');
    const cntCtx = this.continentCanvas.nativeElement.getContext('2d');

    if (!ctx) throw Error('Context is null');
    if (!cntCtx) throw Error('ContinentContext is null');
    this.context = ctx;
    this.continentContext = ctx;
    this.redrawMap();
  }

  clickHandler(event: any) {
    if (!this.context) throw Error('Context is undefined');
    const zoom = this.context.canvas.width / this.context.canvas.offsetWidth;

    const x = event.layerX * zoom;
    const y = event.layerY * zoom;

    for (let i = 0; i < this.drawnTroopCounts.length; i++) {
      const myClass = this.drawnTroopCounts[i];
      if (
        this.context.isPointInPath(myClass.path, x, y) ||
        this.context.isPointInStroke(myClass.path, x, y)
      ) {
        return this.clickedTerritory(myClass);
      }
    }

    for (let i = 0; i < this.drawnTerritories.length; i++) {
      const myClass = this.drawnTerritories[i];
      if (
        this.context.isPointInPath(myClass.path, x, y) ||
        this.context.isPointInStroke(myClass.path, x, y)
      ) {
        return this.clickedTerritory(myClass);
      }
    }
  }

  redrawMap() {
    if (!this.context || !this.continentContext)
      throw Error('Context undefined');
    clearCanvas(this.context);
    clearCanvas(this.continentContext);
    this.drawMap();
  }

  clickedTerritory(myClass: MyClass) {
    console.log('Clicked', myClass.drawInformation.displayName);
    this.selectedTerritoryId = myClass.drawInformation.mapTerritory.id;
    this.redrawMap();
  }

  onClick() {
    this.showContinentView = !this.showContinentView;
    this.redrawMap();
  }

  drawMap() {
    if (!this.context) throw Error('Context is null');
    if (!this.gameService.map) throw Error('Map not found');

    const map = this.gameService.map;
    const drawInformations = this.gameMapService.drawInformations;

    setCanvasSize(map.svgWidth, map.svgHeight, this.context!);
    setCanvasSize(map.svgWidth, map.svgHeight, this.continentContext!);

    this.drawnTerritories = drawTerritories(
      drawInformations,
      this.context,
      this.selectedTerritoryId
    );

    this.drawnTroopCounts = drawTroopCounts(
      drawInformations,
      this.context,
      this.selectedTerritoryId
    );

    drawContinentOverlay(map, this.continentCanvas, this.context);
    drawContinentView(map, this.continentCanvas);
  }
}
