import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DisplayLobby } from './display-lobby';
import { globals } from 'src/app/globals';

@Injectable({
  providedIn: 'root'
})
export class ExploreService {

  constructor(private httpClient : HttpClient) { }

  getLobbies(){
    return this.httpClient.get<DisplayLobby[]>(`${globals.springHttpServer}/lobbies/getall`);
  }

}
