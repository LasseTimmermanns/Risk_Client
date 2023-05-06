import { Component } from '@angular/core';
import { MapService } from 'src/app/Services/map.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  constructor(private mapService : MapService){}

  createGame(){
    this.mapService.map("classic").subscribe((map) => {
      console.log(map)
    });
  }

}
