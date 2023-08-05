import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-turn-phase',
  templateUrl: './turn-phase.component.html',
  styleUrls: ['./turn-phase.component.scss'],
})
export class TurnPhaseComponent {
  @Input() phase: number = 0;
  @Output() onNextPhase: EventEmitter<string> = new EventEmitter<string>();

  phaseToString: string[] = ['deploy', 'attack', 'fortify'];

  nextPhase() {
    this.onNextPhase.emit('nextPhase');
  }
}
