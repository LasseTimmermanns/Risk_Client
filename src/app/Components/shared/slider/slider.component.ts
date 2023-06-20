import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { InputEvent } from '../InputEvent';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {

  @ViewChild("slider") slider!: ElementRef;

  arrowPosition: number = 0;
  @Input() max?: number = 100;
  @Input() min?: number = 0;
  @Input() value?: number = 50;
  @Input("name") message_name: string = "NO_NAME";

  @Output()
  onChange = new EventEmitter<InputEvent>();


  ngAfterContentChecked(): void {
    this.updateArrowPosition();
  }

  onSliderChange() {
    const before = this.value;
    this.value = this.slider.nativeElement.value;
    if(before === this.value) return;

    this.onChange.emit(new InputEvent(this.message_name, this.value));
    this.updateArrowPosition();
  }

  updateArrowPosition() {

    //DUE THIS.MIN = 0; IT IS UNDEFINED BY ENINGE; MAKE IT 0
    if(!(this.max && this.min !== undefined && this.value)) return;

    const sliderWidth = this.slider.nativeElement.clientWidth;
    const sliderRange = this.max - this.min;
    const sliderThumbWidth = 20; // Adjust this value based on your thumb width

    const thumbPositionRatio = (this.value - this.min) / sliderRange;
    const availableWidth = sliderWidth - sliderThumbWidth;
    this.arrowPosition = thumbPositionRatio * availableWidth + sliderThumbWidth / 2;
  }

  @HostListener('window:resize', [])
  onResize() {
    this.updateArrowPosition()
  }


}
