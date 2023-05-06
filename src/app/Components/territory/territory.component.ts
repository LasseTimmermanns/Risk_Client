import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-territory',
  templateUrl: './territory.component.html',
  styleUrls: ['./territory.component.scss']
})
export class TerritoryComponent{
  @Input("path")
  path!: string;


}
