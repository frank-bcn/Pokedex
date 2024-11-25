import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokeballComponent } from './pokeball/pokeball.component';
import { HttpClientModule } from '@angular/common/http';
import { PokeCardComponent } from './poke-card/poke-card.component';
import { PokeProgressComponent } from './poke-progress/poke-progress.component';

@NgModule({
  declarations: [
    AppComponent,
    PokeballComponent,
    PokeCardComponent,
    PokeProgressComponent,
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
