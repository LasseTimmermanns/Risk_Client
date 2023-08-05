import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnPhaseComponent } from './turn-phase.component';

describe('TurnPhaseComponent', () => {
  let component: TurnPhaseComponent;
  let fixture: ComponentFixture<TurnPhaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TurnPhaseComponent]
    });
    fixture = TestBed.createComponent(TurnPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
