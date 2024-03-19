import { Component } from '@angular/core';
import { LoadPokemonService } from './services/load-pokemon.service';
import { SelectedPokemonService } from './services/selected-pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'pokedex';

  constructor(
    public lp: LoadPokemonService,
    public sp: SelectedPokemonService
  ) {}

  ngOnInit() {
    this.lp.loadFirstPokemonData().then(() => {
      this.lp.loadRemainingPokemonData();
    });
  }
}