import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchSettingsViewComponent } from './switch-settings-view.component';

describe('SwitchSettingsViewComponent', () => {
  let component: SwitchSettingsViewComponent;
  let fixture: ComponentFixture<SwitchSettingsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchSettingsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwitchSettingsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
