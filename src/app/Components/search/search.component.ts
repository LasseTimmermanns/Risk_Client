import { Component } from '@angular/core';
import { DisplayLobby } from './DisplayLobby';
import { SearchService } from 'src/app/Services/Search/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  lobbies: DisplayLobby[] = [];

  constructor(private searchService: SearchService){
    searchService.getLobbies().subscribe(lobbies=>{
      this.lobbies = lobbies;
      console.log(lobbies);
    });
  }

}
