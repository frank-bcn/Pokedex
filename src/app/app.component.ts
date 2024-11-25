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
  ) {
    console.log(
      '%c  Fränk rules!',
      'font-size:20px; font-weight:800; color:red; text-shadow: 5px 5px 10px green'
    );
  }
  ngOnInit() {
    this.lp.loadInitialPokemon().then(() => {
      this.lp.loadAdditionalPokemon();
    });
  }
}