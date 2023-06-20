import { Component, Input } from '@angular/core';
import { Lobby } from 'src/app/Services/Lobby/Lobby';
import { LobbyService } from 'src/app/Services/Lobby/lobby.service';
import { QueryIdentification } from '../QueryIdentification';
import { InputEvent } from '../../shared/InputEvent';

@Component({
  selector: 'app-changeable-settings',
  templateUrl: './changeable-settings.component.html',
  styleUrls: ['./changeable-settings.component.scss']
})
export class ChangableSettingsComponent {

  @Input() lobby?: Lobby;
  @Input("identification") queryIdentification?: QueryIdentification;

  constructor(private lobbyService: LobbyService){}

  changeAttribute(event: InputEvent){
    this.lobbyService.changeAttribute(event, this.queryIdentification!);
  }

}
