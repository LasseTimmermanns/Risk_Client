import { Component } from '@angular/core';
import { RiskMapService } from './services/risk-map.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'risk_client';

  constructor(private riskMapService : RiskMapService){}

  async do_it(){
    const body = await this.riskMapService.get_map("classic")
    console.log(body)
  }
}
