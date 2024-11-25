import { Component } from '@angular/core';
import { SelectedPokemonService } from '../services/selected-pokemon.service';

@Component({
  selector: 'app-poke-progress',
  templateUrl: './poke-progress.component.html',
  styleUrl: './poke-progress.component.scss',
})
export class PokeProgressComponent {
  constructor(public sp: SelectedPokemonService) {}
  
/*
 * powerLevel: Diese Funktion berechnet den Prozentsatz eines gegebenen Werts im Vergleich zu einem Maximalwert
 * 
 * @param value - Der Wert, dessen Prozentsatz berechnet werden soll (Typ: number)
 * @returns - Der berechnete Prozentsatz als string (z. B. "45%")
 */  powerLevel(value: number): string {
    const maxValue = 154;
    const percentage = (value / maxValue) * 100;
    return `${percentage}%`;
  }
}
