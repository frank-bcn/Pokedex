import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoadPokemonService {
  pokemonData: any[] = [];

  constructor(private http: HttpClient) {}

  async loadFirstPokemonData() {
    for (let i = 1; i <= 20; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      try {
        const data = await this.http.get<any>(url).toPromise();
        this.capitalizePokemonName(data);
        this.pokemonData.push(data);
      } catch (error) {}
    }
  }

  async loadRemainingPokemonData() {
    for (let i = 21; i <= 151; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      try {
        const data = await this.http.get<any>(url).toPromise();
        this.capitalizePokemonName(data);
        this.pokemonData.push(data);
      } catch (error) {}
    }
  }

  capitalizePokemonName(pokemon: any) {
    pokemon.name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  }
}