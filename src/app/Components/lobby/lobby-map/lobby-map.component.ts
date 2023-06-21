import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { DisplayMap } from '../Map';
import { LobbyPlayer } from 'src/app/Services/Lobby/LobbyPlayer';
import { PlayerSettingsService } from 'src/app/Services/Lobby/PlayerSettings/player-settings.service';
import { QueryIdentification } from '../QueryIdentification';
import { ColorChangingService } from 'src/app/Services/Lobby/Color/color-changing.service';

@Component({
  selector: 'app-lobby-map',
  templateUrl: './lobby-map.component.html',
  styleUrls: ['./lobby-map.component.scss']
})
export class LobbyMapComponent {

  @Input("map") display_map?: DisplayMap;
  @Input("players") players?: LobbyPlayer[] = [];
  @Input("identification") queryIdentification?: QueryIdentification;
  @Input("playerid") playerId: string = "";

  @ViewChild('map', { static: false }) mapRef?: ElementRef;

  rectheight: number = 332;
  scale_factor: number = 0.5;

  constructor(private playerSettingsService: PlayerSettingsService, private colorChangingService: ColorChangingService){}

  ngOnChanges(changes: SimpleChanges): void {
    this.updateScaleFactor()
  }

  updateScaleFactor(){
    if(this.display_map)
      this.scale_factor = this.display_map.display_height / 2000;
  }

  getScales() {
    let svg_width = this.mapRef?.nativeElement.clientWidth;
    let svg_height = this.mapRef?.nativeElement.clientHeight;

    let scale_x = svg_width / this.display_map!.display_width;
    let scale_y = svg_height / this.display_map!.display_height;

    return [scale_x, scale_y];
  }

  handleClick(event: any) {
    let scale_x = this.getScales()[0];
    let scale_y = this.getScales()[1];

    let flagx = event.offsetX / scale_x;
    let flagy = event.offsetY / scale_y;

    this.playerSettingsService.changeFlagPosition(
      flagx,
      flagy,
      this.queryIdentification!
    );
  }

  changeColor(playerId: string) {
    if (playerId !== this.playerId) return;
    this.colorChangingService.changeColor(this.players!, this.queryIdentification!);
  }
}
