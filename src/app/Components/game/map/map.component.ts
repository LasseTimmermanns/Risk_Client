import { Component, Input } from '@angular/core';
import { Map } from 'src/app/Objects/Game/map';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {

  @Input() map?: Map;


  constructor(){}

}
