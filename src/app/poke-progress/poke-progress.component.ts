import { Component } from '@angular/core';
import { SelectedPokemonService } from '../services/selected-pokemon.service';

@Component({
  selector: 'app-poke-progress',
  templateUrl: './poke-progress.component.html',
  styleUrl: './poke-progress.component.scss',
})
export class PokeProgressComponent {
  constructor(public sp: SelectedPokemonService) {}

  powerLevel(value: number): string {
    const maxValue = 154;
    const percentage = (value / maxValue) * 100;
    return `${percentage}%`;
  }
}
