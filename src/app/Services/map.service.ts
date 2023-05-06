import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Map } from '../Components/game/map/map';
import { globals } from '../globals';

@Injectable({
  providedIn: 'root'
})

export class MapService {

  constructor(private httpClient: HttpClient) { }

  public map(map_name: string){
    return this.httpClient.get<Map>(`${globals.spring_server}/maps/${map_name}`);
  }

}
