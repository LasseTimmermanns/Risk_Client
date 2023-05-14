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
import { CreateComponent } from './Components/create/create.component';
import { SearchComponent } from './Components/search/search.component';

const allRoutes: Routes = [
  {path: "", component: LandingComponent},
  {path: "search", component: SearchComponent},
  {path: "create", component: CreateComponent},
  {path: "game", component: GameComponent},
  {path: "lobby/:id", component: LobbyComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    GameComponent,
    LobbyComponent,
    LandingComponent,
    CreateComponent,
    SearchComponent,
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
