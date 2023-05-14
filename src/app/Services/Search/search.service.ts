import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lobby } from './Lobby';
import { globals } from 'src/app/globals';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient : HttpClient) { }

  getLobbies(){
    return this.httpClient.get<Lobby>(`${globals.spring_server}/lobbies/getall`);
  }

}
