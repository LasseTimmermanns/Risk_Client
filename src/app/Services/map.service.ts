import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { globals } from '../globals';
import { Map } from '../Objects/Game/map';

@Injectable({
  providedIn: 'root'
})

export class MapService {

  constructor(private httpClient: HttpClient) { }

  public get_map(map_id: string){
    return this.httpClient.get<Map>(`${globals.spring_httpserver}/maps/${map_id}`);
  }

}
