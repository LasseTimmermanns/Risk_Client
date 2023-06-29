import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Map } from '../data_access/map';
import { globals } from 'src/app/globals';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private httpClient: HttpClient) {}

  public getMap(mapId: string) {
    return this.httpClient.get<Map>(
      `${globals.springHttpServer}/maps/${mapId}`
    );
  }
}
