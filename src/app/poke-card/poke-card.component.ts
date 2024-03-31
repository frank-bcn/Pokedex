import { Component } from '@angular/core';
import { LoadPokemonService } from '../services/load-pokemon.service';
import { SelectedPokemonService } from '../services/selected-pokemon.service';

@Component({
  selector: 'app-poke-card',
  templateUrl: './poke-card.component.html',
  styleUrls: ['./poke-card.component.scss']
})
export class PokeCardComponent {

  constructor(
    public lp: LoadPokemonService,
    public sp: SelectedPokemonService,
  ) {}

  powerLevel(value: number): string {
    const maxValue = 154;
    const percentage = (value / maxValue) * 100;
    return `${percentage}%`;
  }

}