import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-switch-settings-view',
  templateUrl: './switch-settings-view.component.html',
  styleUrls: ['./switch-settings-view.component.scss']
})
export class SwitchSettingsViewComponent {

  @Input() open: boolean = false;

}
