import {
  Component,
  ElementRef,
  Input,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { QueryIdentification } from '../../../shared/data_access/query-identification';
import { DisplayMap } from '../../data_access/lobby-map';
import { LobbyPlayer } from '../../data_access/lobby-player';
import { ColorChangingService } from '../../utils/color-changing.service';
import { FlagPositionService } from '../../utils/flag-position.service';

@Component({
  selector: 'app-lobby-map',
  templateUrl: './lobby-map.component.html',
  styleUrls: ['./lobby-map.component.scss'],
})
export class LobbyMapComponent {
  @Input('map') displayMap?: DisplayMap;
  @Input('players') players?: LobbyPlayer[] = [];
  @Input('identification') queryIdentification?: QueryIdentification;
  @Input('playerId') playerId: string = '';

  @ViewChild('map', { static: false }) mapRef?: ElementRef;

  rectHeight: number = 332;
  scaleFactor: number = 0.5;

  constructor(
    private flagPositionService: FlagPositionService,
    private colorChangingService: ColorChangingService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.updateScaleFactor();
  }

  updateScaleFactor() {
    if (this.displayMap)
      this.scaleFactor = this.displayMap.displayHeight / 2000;
  }

  getScales() {
    let svgWidth = this.mapRef?.nativeElement.clientWidth;
    let svgHeight = this.mapRef?.nativeElement.clientHeight;

    let scaleX = svgWidth / this.displayMap!.displayWidth;
    let scaleY = svgHeight / this.displayMap!.displayHeight;

    return [scaleX, scaleY];
  }

  handleClick(event: any) {
    let scaleX = this.getScales()[0];
    let scaleY = this.getScales()[1];

    let flagX = event.offsetX / scaleX;
    let flagY = event.offsetY / scaleY;

    this.flagPositionService.changeFlagPosition(
      flagX,
      flagY,
      this.queryIdentification!
    );
  }

  changeColor(playerId: string) {
    if (playerId !== this.playerId) return;
    this.colorChangingService.changeColor(
      this.players!,
      this.queryIdentification!
    );
  }
}
