import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import Panzoom from '@panzoom/panzoom';
import { Color } from 'src/app/shared/data_access/color';
import { Pattern } from '../../data_access/pattern';
import { Player } from '../../data_access/player';
import { MapTerritory } from '../../data_access/territory';
import { BackgroundService } from '../../utils/background.service';
import { GameMapService } from '../../utils/game-map.service';
import { GameService } from '../../utils/game.service';

@Component({
  selector: 'app-game-map',
  templateUrl: './game-map.component.html',
  styleUrls: ['./game-map.component.scss'],
})
export class GameMapComponent implements OnInit {
  showContinents: boolean = false;
  drawTerritoryNames: boolean = false;

  drawTerritoryNamesAtScale: number = 1.5;

  @ViewChild('svgElement', { static: true }) svgElement: any;

  @Input() selectedPrimaryId?: number;
  @Input() selectedSecondaryId?: number;
  @Input() possiblePrimarySelectionIds: number[] = [];
  @Input() possibleAttacks: number[] = [];
  @Input() attacker?: Player;

  @Output() selectTerritory = new EventEmitter<number[]>();

  panZoomMap: any;
  minWatchableArea = 0.8;

  flagwidth = 82;
  flagheight = 160;

  pattern?: Pattern;

  constructor(
    private backgroundService: BackgroundService,
    public gameService: GameService,
    public gameMapService: GameMapService
  ) {
    this.getDefault();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.initializePanZoom2();
    }, 100);
  }

  getDefault() {
    this.backgroundService.getById('japanese').subscribe((e) => {
      this.pattern = e;
    });
  }

  initializePanZoom2() {
    const panZoomMap = Panzoom(this.svgElement.nativeElement);
    this.panZoomMap = panZoomMap;
  }

  clickedTerritory(territoryId: number, event: any) {
    if (
      !(
        this.possiblePrimarySelectionIds.includes(territoryId) ||
        this.possibleAttacks.includes(territoryId)
      )
    )
      return;
    this.selectTerritory.emit([territoryId, event.pageX, event.pageY]);
  }

  highlight3d = 30;
  getTerritoryStyle(territoryId: number, color: Color) {
    const basicStyle = {
      stroke: color.secondaryHex,
      strokeWidth: '2px',
      fill: color.hex,
      filter: `url(#territory-stroke-${color.id})`,
    };

    if (territoryId === this.selectedPrimaryId) {
      const styleObj = {
        ...basicStyle,
        filter: `url(#territory-stroke-${color.id}) drop-shadow(0px ${this.highlight3d}px ${color.secondaryHex})`,
        transform: `translateY(-${this.highlight3d}px)`,
        fill: color.highlightHex,
      };
      return styleObj;
    } else if (this.possiblePrimarySelectionIds.includes(territoryId)) {
      const styleObj = {
        ...basicStyle,
        strokeWidth: '15px',
        stroke: color.highlightHex,
      };
      return styleObj;
    } else if (this.possibleAttacks.includes(territoryId)) {
      const styleObj = {
        ...basicStyle,
        filter: `url(#territory-stroke-${color.id}) drop-shadow(0px ${
          this.highlight3d / 4
        }px ${color.secondaryHex})`,
        transform: `translateY(-${this.highlight3d / 4}px)`,
      };
      return styleObj;
    }

    return basicStyle;
  }

  getTroopDisplayStyle(territoryId: number) {
    if (territoryId === this.selectedPrimaryId) {
      const highlightStyle = {
        transform: `translateY(-${this.highlight3d}px)`,
      };
      return highlightStyle;
    } else if (this.possibleAttacks.includes(territoryId)) {
      const highlightStyle = {
        transform: `translateY(-${this.highlight3d / 4}px)`,
      };
      return highlightStyle;
    }
    return {};
  }

  getTroopDisplayTransform(mapTerritory: MapTerritory) {
    const transformation = {
      transform: `translate(${mapTerritory.centerX}px, ${mapTerritory.centerY}px)`,
    };
    return transformation;
  }
}
