import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-troop-movement-slider',
  templateUrl: './troop-movement-slider.component.html',
  styleUrls: ['./troop-movement-slider.component.scss'],
})
export class TroopMovementSliderComponent {
  @Input('min') min: number = 0;
  @Input('max') max: number = 10;
  @Input('index') currentIndex: number = this.min;

  @Output() indexChange: EventEmitter<number> = new EventEmitter<number>();
  deltay: number = 0;

  sensitivity: number = 100;

  carousel: number[] = [];

  dragging: boolean = false;
  drag_delta: number = 0;

  drag_sensitivity: number = 100;

  @Output('value') out?: number;

  ngOnChanges(changes: SimpleChanges): void {
    this.carousel = Array.from(Array(this.max - this.min + 1).keys()).map(
      (i) => i + this.min
    );
  }

  onWheel(event: any) {
    const delta = event.deltaY != 0 ? event.deltaY : event.deltaX;

    this.deltay += delta;

    while (this.deltay > this.sensitivity) {
      this.deltay += -this.sensitivity;
      this.change(1);
    }
    while (this.deltay < -this.sensitivity) {
      this.deltay += this.sensitivity;
      this.change(-1);
    }
  }

  change(value: number) {
    this.currentIndex += value;
    this.currentIndex += this.carousel.length;
    this.currentIndex %= this.carousel.length;

    this.indexChange.emit(this.carousel[this.currentIndex]);
  }

  submit() {
    this.out = this.carousel[this.currentIndex];
  }

  beginDrag() {
    this.dragging = true;
  }

  stopDrag(reason: string) {
    this.dragging = false;
  }

  drag(event: MouseEvent) {
    if (!this.dragging) return;

    this.drag_delta += event.movementX;

    while (this.drag_delta > this.drag_sensitivity) {
      this.drag_delta += -this.drag_sensitivity;
      this.change(-1);
    }
    while (this.drag_delta < -this.drag_sensitivity) {
      this.drag_delta += this.drag_sensitivity;
      this.change(1);
    }
  }
}
