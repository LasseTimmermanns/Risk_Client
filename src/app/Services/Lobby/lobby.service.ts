import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Color } from '../Settings/Color';
import { globals } from 'src/app/globals';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {

  constructor(private httpClient: HttpClient) { }

  getAllColors(){
    return this.httpClient.get<Color[]>(`${globals.spring_server}/settings/colors/all`)
  }

}
