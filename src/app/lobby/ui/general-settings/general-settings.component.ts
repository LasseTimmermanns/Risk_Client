import { Component, Input } from '@angular/core';
import { Lobby } from '../../data_access/lobby';
import { QueryIdentification } from 'src/app/shared/data_access/query-identification';
import { LobbyService } from '../../utils/lobby.service';
import { InputEvent } from '../../data_access/input-event';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.scss'],
})
export class GeneralSettingsComponent {
  @Input() lobby?: Lobby;
  @Input('identification') queryIdentification?: QueryIdentification;

  constructor(private lobbyService: LobbyService) {}

  changeAttribute(event: InputEvent) {
    this.lobbyService.changeAttribute(event, this.queryIdentification!);
  }
}
