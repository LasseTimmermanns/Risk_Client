import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Map } from '../Components/map/map';
import { globals } from '../globals';
import { Territory } from '../Components/territory/territory';


@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private httpClient: HttpClient) { }

  public map(map_name: string){
    return this.httpClient.get<Map>(`${globals.spring_server}/maps/${map_name}`);
  }
}
