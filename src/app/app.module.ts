import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TerritoryComponent } from './Components/game/map/territory/territory.component';
import { MapComponent } from './Components/game/map/map.component';
import { SettingsComponent } from './Components/settings/settings.component';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './Components/game/game.component';

const allRoutes: Routes = [
  {path: "", component: SettingsComponent},
  {path: "game", component: GameComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TerritoryComponent,
    MapComponent,
    SettingsComponent,
    GameComponent
  ],
  imports: [
    RouterModule.forRoot(allRoutes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
