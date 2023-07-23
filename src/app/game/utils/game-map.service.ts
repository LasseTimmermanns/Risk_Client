import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { globals } from 'src/app/globals';
import { Shape } from '../data_access/shape';

@Injectable({
  providedIn: 'root',
})
export class GameMapService {
  constructor(private httpClient: HttpClient) {}

  getShapes(n: number) {
    return this.httpClient.get<Shape[]>(
      `${globals.springHttpServer}/shapes/getmany/${n}`
    );
  }
}
