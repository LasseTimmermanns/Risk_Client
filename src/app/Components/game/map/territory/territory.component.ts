import { Component, Input } from '@angular/core';
import { Territory } from './territory';

@Component({
  selector: 'app-territory',
  templateUrl: './territory.component.html',
  styleUrls: ['./territory.component.scss']
})
export class TerritoryComponent{

  @Input() territory?: Territory;

}
