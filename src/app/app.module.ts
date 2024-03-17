import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { PokedexComponent } from './pages/pokedex/pokedex.component';
import { PokeballComponent } from './pages/pokeball/pokeball.component';
import { HttpClientModule } from '@angular/common/http';
import { ContentPageComponent } from './pages/content-page/content-page.component';

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    PokeballComponent,
    PokedexComponent,
    ContentPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
