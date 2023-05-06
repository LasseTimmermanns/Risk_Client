import { Component, OnInit, Input } from '@angular/core';
import { MapService } from 'src/app/Services/map.service';
import { Map } from './map';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {

  @Input() map?: Map;

  constructor(){}

}
