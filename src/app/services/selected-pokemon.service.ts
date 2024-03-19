import { Injectable } from '@angular/core';
import { LoadPokemonService } from './load-pokemon.service';

@Injectable({
  providedIn: 'root',
})
export class SelectedPokemonService {

  selectedPokemon: any = null;

  colors: any = {
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

  constructor( public lp: LoadPokemonService) {}

  selectPokemon(pokemon: any) {
    this.selectedPokemon = pokemon;
    this.typeBackgroundColor();
  }

  typeBackgroundColor(): string {
    if (!this.selectedPokemon || !this.selectedPokemon.types) {
      return ''; 
    }
  
    let types = this.selectedPokemon.types;
    if (types.length === 1) {
      return this.colors[types[0].type.name];
    } else {
      let backgroundColor1 = this.colors[types[0].type.name];
      let backgroundColor2 = this.colors[types[1].type.name];
      return `linear-gradient(to bottom left, ${backgroundColor1} 50%, ${backgroundColor2} 50%)`;
    }
  }

  close() {
      this.selectedPokemon = null;
  }
  
}