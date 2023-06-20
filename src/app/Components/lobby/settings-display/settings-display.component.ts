import { Component, Input } from '@angular/core';
import { Lobby } from 'src/app/Services/Lobby/Lobby';
import { QueryIdentification } from '../QueryIdentification';
import { LobbyService } from 'src/app/Services/Lobby/lobby.service';
import { InputEvent } from '../../shared/InputEvent';

@Component({
  selector: 'app-settings-display',
  templateUrl: './settings-display.component.html',
  styleUrls: ['./settings-display.component.scss']
})
export class SettingsDisplayComponent {


  @Input() lobby?: Lobby;


}
