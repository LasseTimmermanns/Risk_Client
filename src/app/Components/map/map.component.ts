import { Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/Services/map.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {


  constructor(private mapService : MapService){}

  ngOnInit() {
    this.mapService.map("classic").subscribe((map) => {
      console.log(map)
    });

  }
}
