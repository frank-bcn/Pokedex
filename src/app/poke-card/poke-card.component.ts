import { Component } from '@angular/core';
import { LoadPokemonService } from '../services/load-pokemon.service';
import { SelectedPokemonService } from '../services/selected-pokemon.service';
import { LoadEvolutionService } from '../services/load-evolution.service';

@Component({
  selector: 'app-poke-card',
  templateUrl: './poke-card.component.html',
  styleUrls: ['./poke-card.component.scss'],
})
export class PokeCardComponent {
  isFlipped = false;

  constructor(
    public lp: LoadPokemonService,
    public sp: SelectedPokemonService,
    public le: LoadEvolutionService
  ) {}

  /*
   * ngOnInit: Diese Methode wird beim Initialisieren der Komponente aufgerufen.
   * Sie prüft, ob ein ausgewähltes Pokémon vorhanden ist und lädt dessen Evolutionsdaten, falls dies zutrifft.
   */
  ngOnInit() {
    if (this.sp.selectedPokemon) {
      this.le.loadEvolution(this.sp.selectedPokemon.species.url);
    }
  }

  /*
   * toggleFlip: Diese Methode wird verwendet, um den Zustand der "Flip"-Aktion umzuschalten.
   * Sie kehrt den aktuellen Wert der `isFlipped`-Eigenschaft um.
   */
  toggleFlip() {
    this.isFlipped = !this.isFlipped;
  }
}