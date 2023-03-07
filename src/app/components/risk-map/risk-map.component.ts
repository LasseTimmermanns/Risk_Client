import { Component, Input } from '@angular/core';
import { RiskMap } from '@app/interfaces/risk_map';

@Component({
  selector: 'app-risk-map',
  templateUrl: './risk-map.component.html',
  styleUrls: ['./risk-map.component.scss']
})
export class RiskMapComponent {

  @Input() riskMapInterface?: RiskMap;


  printName(name: string){
    console.log(name)
  }

  onTerritoryHover(event : MouseEvent){
    const mytarget = <SVGPathElement> event.target
    mytarget.classList.add("territory-hovered")
   }

  onTerritoryUnhover(event : MouseEvent){
    const mytarget = <SVGPathElement> event.target
    mytarget.classList.remove("territory-hovered")
  }

}
