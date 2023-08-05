import {
  Component,
  EventEmitter,
  HostListener,
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
  @Input('min') min?: number;
  @Input('max') max?: number;
  currentIndex: number = 0;

  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() onAbort: EventEmitter<boolean> = new EventEmitter<boolean>();
  deltay: number = 0;

  sensitivity: number = 100;

  carousel: number[] = [];

  dragging: boolean = false;
  drag_delta: number = 0;

  drag_sensitivity: number = 100;

  @Output() onSubmit: EventEmitter<number> = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges): void {
    if (!(this.min && this.max)) return;
    this.carousel = Array.from(Array(this.max - this.min + 1).keys()).map(
      (i) => i + this.min!
    );

    this.change(0);
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

    this.valueChange.emit(this.carousel[this.currentIndex]);
  }

  submit() {
    this.onSubmit.emit(this.carousel[this.currentIndex]);
  }

  abort() {
    this.onAbort.emit(true);
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(
    event: KeyboardEvent
  ) {
    this.abort();
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
