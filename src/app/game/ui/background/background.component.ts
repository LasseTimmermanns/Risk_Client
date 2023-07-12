import { Component } from '@angular/core';
import { BackgroundService } from '../../utils/background.service';
import { Pattern } from './../../data_access/pattern';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss'],
})
export class BackgroundComponent {
  pattern?: Pattern;
  str =
    "<rect x='0' y='0' width='100%' height='100%' fill='url(#secondary)'/><path d='M0 22.5h30v15H0zm15-15h30v15H15m-30-15h30v15h-30zm15-15h30v15H0z' stroke-width='1' stroke='url(#primary)' fill='none'/>";

  constructor(private backgroundService: BackgroundService) {
    this.switch();
  }

  switch() {
    this.backgroundService.getNext().subscribe((e) => {
      this.pattern = e;
      console.log(this.pattern);
    });
  }

  getPatternString(): string {
    if (!this.pattern) return '';
    return `<pattern id='pattern' ${this.pattern.pattern}</pattern>`;
  }
}
