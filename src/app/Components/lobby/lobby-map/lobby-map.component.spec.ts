import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbyMapComponent } from './lobby-map.component';

describe('LobbyMapComponent', () => {
  let component: LobbyMapComponent;
  let fixture: ComponentFixture<LobbyMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LobbyMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LobbyMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
