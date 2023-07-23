import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TroopMovementSliderComponent } from './troop-movement-slider.component';

describe('TroopMovementSliderComponent', () => {
  let component: TroopMovementSliderComponent;
  let fixture: ComponentFixture<TroopMovementSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TroopMovementSliderComponent]
    });
    fixture = TestBed.createComponent(TroopMovementSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
