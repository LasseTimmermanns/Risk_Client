import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { globals } from 'src/app/globals';
import { Pattern } from '../data_access/pattern';

@Injectable({
  providedIn: 'root',
})
export class BackgroundService {
  constructor(private httpClient: HttpClient) {}

  getById(id: string): Observable<Pattern> {
    return this.httpClient.get<Pattern>(
      `${globals.springHttpServer}/patterns/${id}`
    );
  }
}
