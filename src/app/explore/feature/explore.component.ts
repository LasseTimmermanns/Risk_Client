import { Component } from '@angular/core';
import { ExploreService } from '../data_access/explore.service';
import { DisplayLobby } from '../data_access/display-lobby';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
})
export class ExploreComponent {
  lobbies: DisplayLobby[] = [];

  constructor(private exploreService: ExploreService) {
    this.retrieveLobbies();
  }

  retrieveLobbies() {
    this.exploreService.getLobbies().subscribe((lobbies) => {
      this.lobbies = lobbies;
    });
  }
}
