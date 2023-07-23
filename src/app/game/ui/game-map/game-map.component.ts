import { Component, Input, OnInit, ViewChild } from '@angular/core';
import Panzoom from '@panzoom/panzoom';
import { Continent } from '../../data_access/continent';
import { Map } from '../../data_access/map';
import { Pattern } from '../../data_access/pattern';
import { Player } from '../../data_access/player';
import { GameTerritory, MapTerritory } from '../../data_access/territory';
import { BackgroundService } from '../../utils/background.service';
import { GameMapHelper } from '../../utils/game-map-helper';

@Component({
  selector: 'app-game-map',
  templateUrl: './game-map.component.html',
  styleUrls: ['./game-map.component.scss'],
})
export class GameMapComponent implements OnInit {
  ngOnInit(): void {
    setTimeout(() => {
      this.initializePanZoom2();
    }, 100);
  }

  showContinents: boolean = false;
  drawTerritoryNames: boolean = false;

  drawTerritoryNamesAtScale: number = 1.5;

  @Input('thisPlayersTurn') thisPlayersTurn?: boolean;
  @Input('map') map!: Map;
  @Input('gameTerritories') gameTerritories?: GameTerritory[];
  @Input('players') players?: Player[];
  @ViewChild('svgElement', { static: true }) svgElement: any;

  panZoomMap: any;
  minWatchableArea = 0.8;

  pattern?: Pattern;

  constructor(private backgroundService: BackgroundService) {
    this.getDefault();
  }

  getDefault() {
    this.backgroundService.getById('japanese').subscribe((e) => {
      this.pattern = e;
    });
  }

  remove_underscores(str: string) {
    return str.replaceAll('_', ' ');
  }

  initializePanZoom2() {
    const panZoomMap = Panzoom(this.svgElement.nativeElement);
    this.panZoomMap = panZoomMap;
  }

  getOwner(territoryId: number): Player | undefined {
    // console.log('Called GetOwner');
    if (!this.players || !this.gameTerritories) return;
    return GameMapHelper.getOwner(
      territoryId,
      this.players,
      this.gameTerritories
    );
  }

  getGameTerritory(territoryId: number): GameTerritory | undefined {
    // console.log('Called GetGameTerritory');
    if (!this.players || !this.gameTerritories) return;
    return GameMapHelper.getGameTerritory(territoryId, this.gameTerritories);
  }

  getMapTerritory(territoryId: number): MapTerritory | undefined {
    // console.log('Called GetMapTerritory');
    return this.map.territories.find((t) => t.id === territoryId);
  }

  getContinentPath(continent: Continent) {
    var str = '';

    continent.territories.forEach((t) => {
      const territory = this.map.territories.find((value) => value.id === t);
      str += territory?.path;
    });
    return str;
  }
}
