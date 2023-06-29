import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DisplayLobby } from '../../Components/search/DisplayLobby';
import { globals } from 'src/app/globals';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient : HttpClient) { }

  getLobbies(){
    return this.httpClient.get<DisplayLobby[]>(`${globals.spring_httpserver}/lobbies/getall`);
  }

}
