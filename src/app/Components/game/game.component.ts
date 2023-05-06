import { MapService } from 'src/app/Services/map.service';
import { Component, OnInit } from '@angular/core';
import { Map } from './map/map';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent{

  map: Map | undefined;

  constructor(private mapService : MapService){
    this.mapService.map("classic").subscribe((curmap) => {
      this.map = curmap;
      console.log(curmap)
    });
  }

}
