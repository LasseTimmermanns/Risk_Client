import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExploreComponent } from './explore/feature/explore.component';
import { GameComponent } from './game/feature/game.component';
import { HomeComponent } from './home/feature/home.component';
import { LobbyComponent } from './lobby/feature/lobby.component';
import { GeneralSettingsComponent } from './lobby/ui/general-settings/general-settings.component';
import { LobbyMapComponent } from './lobby/ui/lobby-map/lobby-map.component';
import { MapSettingsComponent } from './lobby/ui/map-settings/map-settings.component';
import { SettingsDisplayComponent } from './lobby/ui/settings-display/settings-display.component';
import { SliderComponent } from './lobby/ui/slider/slider.component';
import { SwitchSettingsViewComponent } from './lobby/ui/switch-settings-view/switch-settings-view.component';
import { SwitchComponent } from './lobby/ui/switch/switch.component';

const allRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'game', component: GameComponent },
  { path: 'lobby/:lobbyId', component: LobbyComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    LobbyComponent,
    HomeComponent,
    ExploreComponent,
    SliderComponent,
    SwitchComponent,
    SwitchSettingsViewComponent,
    LobbyMapComponent,
    SettingsDisplayComponent,
    GeneralSettingsComponent,
    MapSettingsComponent,
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
  schemas: [],
})
export class AppModule {}
