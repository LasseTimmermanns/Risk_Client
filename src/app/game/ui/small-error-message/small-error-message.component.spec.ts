import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallErrorMessageComponent } from './small-error-message.component';

describe('SmallErrorMessageComponent', () => {
  let component: SmallErrorMessageComponent;
  let fixture: ComponentFixture<SmallErrorMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmallErrorMessageComponent]
    });
    fixture = TestBed.createComponent(SmallErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
