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

  constructor(private backgroundService: BackgroundService) {
    this.getDefault();
  }

  getDefault() {
    this.backgroundService.getById('japanese').subscribe((e) => {
      this.pattern = e;
    });
  }
}
