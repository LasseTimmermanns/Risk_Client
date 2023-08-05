import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-small-error-message',
  templateUrl: './small-error-message.component.html',
  styleUrls: ['./small-error-message.component.scss'],
})
export class SmallErrorMessageComponent {
  @Input('message') message: string = '';
}
