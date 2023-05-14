import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { globals } from 'src/app/globals';
import { Color } from './Color';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private httpClient : HttpClient) { }

  getColors(){
    return this.httpClient.get<Color>(`${globals.spring_server}/settings/colors`);
  }
}
