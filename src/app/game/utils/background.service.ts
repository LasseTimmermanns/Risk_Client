import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { globals } from 'src/app/globals';
import { Pattern } from '../data_access/pattern';

@Injectable({
  providedIn: 'root',
})
export class BackgroundService {
  bg: number = 0;
  count: number = -1;

  constructor(private httpClient: HttpClient) {
    httpClient
      .get<number>(`${globals.springHttpServer}/patterns/count`)
      .subscribe({
        next: (v) => (this.count = v),
      });
  }

  getNext(): Observable<Pattern> {
    const response = this.httpClient.get<Pattern>(
      `${globals.springHttpServer}/patterns/${this.bg}`
    );
    this.bg++;
    this.bg %= this.count;
    return response;
  }
}
