import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent {

  @Input() checked: boolean = false;
  @Input() labelLeft: string = "";
  @Input() labelRight: string = "";

}
