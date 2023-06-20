import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {

  @ViewChild("slider") slider!: ElementRef;

  arrowPosition: number = 0;
  @Input() max: number = 100;
  @Input() min: number = 0;
  @Input() value: number = 50;


  ngAfterViewInit(): void {
     this.updateArrowPosition();
  }

  onSliderChange() {
    this.value = this.slider.nativeElement.value;
    this.updateArrowPosition();
  }

  updateArrowPosition() {
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
