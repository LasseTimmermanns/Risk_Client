import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './Components/game/map/map.component';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './Components/game/game.component';
import { LobbyComponent } from './Components/lobby/lobby.component';
import { LandingComponent } from './Components/landing/landing.component';
import { SearchComponent } from './Components/search/search.component';
import { SliderComponent } from './Components/shared/slider/slider.component';
import { SwitchComponent } from './Components/shared/switch/switch.component';
import { SwitchSettingsViewComponent } from './Components/lobby/switch-settings-view/switch-settings-view.component';
import { LobbyMapComponent } from './Components/lobby/lobby-map/lobby-map.component';
import { SettingsDisplayComponent } from './Components/lobby/settings-display/settings-display.component';
import { ChangableSettingsComponent } from './Components/lobby/changable-settings/changable-settings.component';

const allRoutes: Routes = [
  {path: "", component: LandingComponent},
  {path: "explore", component: SearchComponent},
  {path: "game", component: GameComponent},
  {path: "switch", component: SwitchComponent},
  {path: "lobby/:lobbyid", component: LobbyComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    GameComponent,
    LobbyComponent,
    LandingComponent,
    SearchComponent,
    SliderComponent,
    SwitchComponent,
    SwitchSettingsViewComponent,
    LobbyMapComponent,
    SettingsDisplayComponent,
    ChangableSettingsComponent,
  ],
  imports: [
    RouterModule.forRoot(allRoutes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
