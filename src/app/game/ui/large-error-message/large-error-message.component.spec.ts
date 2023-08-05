import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LargeErrorMessageComponent } from './large-error-message.component';

describe('LargeErrorMessageComponent', () => {
  let component: LargeErrorMessageComponent;
  let fixture: ComponentFixture<LargeErrorMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LargeErrorMessageComponent],
    });
    fixture = TestBed.createComponent(LargeErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
