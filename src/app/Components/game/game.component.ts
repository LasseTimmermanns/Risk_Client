import { MapService } from 'src/app/Services/map.service';
import { Component, OnInit } from '@angular/core';
import { Map } from './map/map';
import { PlayerService } from 'src/app/Services/Player/player.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit{

  map: Map | undefined;
  messages: string[] = [];

  constructor(private mapService : MapService, private playerService: PlayerService){
    this.mapService.map("classic").subscribe((curmap) => {
      this.map = curmap;
      console.log(curmap)
    });
  }


  ngOnInit() {
    this.playerService.connect('User');
    this.playerService.getMessageSubject().subscribe((message) => {
        this.messages.push(message);
    });
  }

  sendMessage(message: string){
    console.log("Sent " + message);
    this.playerService.sendMessage(message);
  }

}
