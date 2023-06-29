import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputEvent } from '../../data_access/input-event';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
})
export class SwitchComponent {
  @Input() checked?: boolean = false;
  @Input() labelLeft?: string = '';
  @Input() labelRight?: string = '';
  @Input('name') message_name: string = 'NO_NAME';

  @Output()
  onChange = new EventEmitter<InputEvent>();

  onCheck() {
    this.onChange.emit(new InputEvent(this.message_name, !this.checked));
  }
}
