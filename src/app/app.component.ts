import { RiskMapComponent } from './components/risk-map/risk-map.component';
import { Component, ViewChild, ViewContainerRef, ComponentRef, AfterViewInit } from '@angular/core';
import { RiskMap } from './interfaces/risk_map';
import { RiskMapService } from './services/risk-map.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  title = 'risk_client';

  @ViewChild("contentElement", { read: ViewContainerRef}) mapContainer! : ViewContainerRef

  mapComponent? : ComponentRef<RiskMapComponent> = undefined

  constructor(private riskMapService : RiskMapService){}

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.do_it()
  }

  async do_it(){
    const map : RiskMap = await this.riskMapService.get_map("classic")
    console.log(map)
    this.initialize_map(map)
  }

  initialize_map(riskMap : RiskMap){
    console.log("Initializing new Map")
    this.mapContainer.clear()
    this.mapComponent = this.mapContainer.createComponent(RiskMapComponent)
    this.mapComponent.instance.riskMapInterface = riskMap
  }
}
