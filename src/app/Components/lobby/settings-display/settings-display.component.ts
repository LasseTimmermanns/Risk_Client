import { Component, ElementRef, HostListener, Input, SimpleChanges, ViewChild } from '@angular/core';
import { Lobby } from 'src/app/Services/Lobby/Lobby';

@Component({
  selector: 'app-settings-display',
  templateUrl: './settings-display.component.html',
  styleUrls: ['./settings-display.component.scss', './settings-display-scroll.scss']
})
export class SettingsDisplayComponent {


  @Input() lobby?: Lobby;
  @ViewChild("wrapper") wrapper?: ElementRef<HTMLDivElement>;

  scrollable: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    this.updateScrollability()
  }

  @HostListener("window:resize")
  onResize(){
    this.updateScrollability();
  }

  scroll(multiplier: number){
    const max_scroll_width = this.wrapper!.nativeElement.offsetWidth / 2.5;
    this.wrapper!.nativeElement.scrollLeft += multiplier * max_scroll_width;
  }

  updateScrollability(){
    if(!this.wrapper) return;
    this.scrollable = this.wrapper.nativeElement.scrollWidth > this.wrapper.nativeElement.offsetWidth;
  }
}
