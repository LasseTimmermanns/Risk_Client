import { Component, Input } from '@angular/core';
import { RiskMap } from '@app/interfaces/risk_map';

@Component({
  selector: 'app-risk-map',
  templateUrl: './risk-map.component.html',
  styleUrls: ['./risk-map.component.scss']
})
export class RiskMapComponent {

  @Input() riskMapInterface?: RiskMap;

}
