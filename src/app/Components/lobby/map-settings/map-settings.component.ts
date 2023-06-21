import { Component, Input, OnInit } from '@angular/core';
import { LobbyService } from 'src/app/Services/Lobby/lobby.service';
import { DisplayMap, MiniatureMap } from '../Map';
import { InputEvent } from '../../shared/InputEvent';
import { QueryIdentification } from '../QueryIdentification';

@Component({
  selector: 'app-map-settings',
  templateUrl: './map-settings.component.html',
  styleUrls: ['./map-settings.component.scss']
})
export class MapSettingsComponent {

  maps: MiniatureMap[] = [];

  @Input() selected?: string = "";
  @Input("identification") queryIdentification!: QueryIdentification;

  constructor(private lobbyService: LobbyService){}

  ngOnInit(): void {
    this.getMaps()
  }

  getMaps(){
    this.lobbyService.getAllMiniatureMaps().subscribe(res => {
      this.maps = res;
    })
  }

  changeMap(map_id: string){
    if(this.selected! == map_id)
      return;

    this.lobbyService.changeAttribute(new InputEvent("map_change", map_id), this.queryIdentification)
  }
}
