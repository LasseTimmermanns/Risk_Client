import { Component, Input } from '@angular/core';
import { QueryIdentification } from '../../../shared/data_access/query-identification';
import { InputEvent } from '../../data_access/input-event';
import { MiniatureMap } from '../../data_access/lobby-map';
import { LobbyService } from '../../utils/lobby.service';

@Component({
  selector: 'app-map-settings',
  templateUrl: './map-settings.component.html',
  styleUrls: ['./map-settings.component.scss'],
})
export class MapSettingsComponent {
  maps: MiniatureMap[] = [];

  @Input() selected?: string = '';
  @Input('identification') queryIdentification?: QueryIdentification;

  constructor(private lobbyService: LobbyService) {}

  ngOnInit(): void {
    this.getMaps();
  }

  getMaps() {
    this.lobbyService.getAllMiniatureMaps().subscribe((res) => {
      this.maps = res;
    });
  }

  changeMap(mapId: string) {
    if (!this.queryIdentification) return;
    if (this.selected! == mapId) return;

    this.lobbyService.changeAttribute(
      new InputEvent('map_change', mapId),
      this.queryIdentification
    );
  }
}
