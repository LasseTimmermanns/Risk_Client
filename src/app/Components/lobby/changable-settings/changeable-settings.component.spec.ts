import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangableSettingsComponent } from './changable-settings.component';

describe('ChangableSettingsComponent', () => {
  let component: ChangableSettingsComponent;
  let fixture: ComponentFixture<ChangableSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangableSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangableSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
