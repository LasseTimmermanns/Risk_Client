import { Component, Input, ViewChild } from '@angular/core';
import { Color } from 'src/app/shared/data_access/color';
import { Map } from '../../data_access/map';
import { Player } from '../../data_access/player';
import { GameTerritory } from '../../data_access/territory';
import { GameMapHelper } from '../../utils/game-map-helper';

@Component({
  selector: 'app-game-map',
  templateUrl: './game-map.component.html',
  styleUrls: ['./game-map.component.scss'],
})
export class GameMapComponent {
  @Input('map') map?: Map;
  @Input('gameTerritories') gameTerritories?: GameTerritory[];
  @Input('players') players?: Player[];

  @ViewChild('svg', { static: true }) svgElement: any;
  panZoomConfig: PanZoomConfig = new PanZoomConfig();

  ngAfterViewInit() {
    const panZoom: PanZoomAPI = this.svgElement.panZoom;

    // Set up zooming functionality
    this.panZoomConfig.zoomLevels = 10; // Number of zoom levels
    this.panZoomConfig.initialZoomLevel = 0; // Initial zoom level (0-10)
    this.panZoomConfig.zoomStep = 0.1; // Zoom step when using mouse wheel

    // Set up panning functionality
    this.panZoomConfig.enablePan = true;
    this.panZoomConfig.panOnClickDrag = true;

    // Subscribe to zoom level changes
    panZoom.modelChanged$.subscribe((model: PanZoomModel) => {
      // Access the zoom level using model.zoomLevel
      console.log('Zoom level:', model.zoomLevel);
    });
  }

  getColor(territoryId: number): Color | undefined {
    if (!this.players || !this.gameTerritories) {
      console.error('Players or GameTerritories not instantiated');
      return;
    }

    return GameMapHelper.getColor(
      territoryId,
      this.players,
      this.gameTerritories
    );
  }

  getGameTerritory(territoryId: number): GameTerritory | undefined {
    if (!this.players || !this.gameTerritories) {
      console.error('Players or GameTerritories not instantiated');
      return;
    }

    return GameMapHelper.getGameTerritory(territoryId, this.gameTerritories);
  }
}
