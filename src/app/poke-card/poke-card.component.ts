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

  ngOnInit() {
    if (this.sp.selectedPokemon) {
      this.le.loadEvolution(this.sp.selectedPokemon.species.url);
    }
  }
  toggleFlip() {
    this.isFlipped = !this.isFlipped;
  }
}