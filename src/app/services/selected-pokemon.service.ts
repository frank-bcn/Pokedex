import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SelectedPokemonService {
  selectedPokemon: any = null;

  colors: Record<string, string> = {
    grass: '#d2f2c2',
    poison: '#f7cdf7',
    fire: '#ffd1b5',
    flying: '#eae3ff',
    water: '#c2f3ff',
    bug: '#e0e8a2',
    normal: '#e6e6c3',
    electric: '#fff1ba',
    ground: '#e0ccb1',
    fighting: '#fcada9',
    psychic: '#ffc9da',
    rock: '#f0e09c',
    fairy: '#ffdee5',
    steel: '#e6eaf0',
    ice: '#e8feff',
    ghost: '#dbbaff',
    dragon: '#c4bdff',
  };

  constructor() {}

  selectPokemon(pokemon: any): void {
    this.selectedPokemon = pokemon;
  }

  close(): void {
    this.selectedPokemon = null;
  }

  typeColor(type: string): string {
    return this.colors[type] || '';
  }

  singleTypeColor(): string {
    const type = this.selectedPokemon.types[0]?.type?.name;
    return type ? this.typeColor(type) : '';
  }

  gradientTypeColor(): string {
    const type1 = this.selectedPokemon.types[0]?.type?.name;
    const type2 = this.selectedPokemon.types[1]?.type?.name;

    const color1 = type1 ? this.typeColor(type1) : '';
    const color2 = type2 ? this.typeColor(type2) : '';

    return `linear-gradient(to bottom left, ${color1} 50%, ${color2} 50%)`;
  }

  typeBackgroundColor(): string {
    if (!this.selectedPokemon || !this.selectedPokemon.types) {
      return '';
    }

    return this.selectedPokemon.types.length === 1
      ? this.singleTypeColor()
      : this.gradientTypeColor();
  }
}