import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RiskMap } from '@app/interfaces/risk_map';
import { firstValueFrom } from 'rxjs'
import * as global from "@app/globals"

@Injectable({
  providedIn: 'root'
})
export class RiskMapService {

  constructor(private http : HttpClient) { }

  async get_map(map_name : string){
    return firstValueFrom(this.http.get<RiskMap>(`${global.server_address}maps/${map_name}`))
  }
}
