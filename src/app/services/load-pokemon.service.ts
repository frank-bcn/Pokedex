import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoadPokemonService {
  pokemonData: any[] = [];

  constructor(private http: HttpClient) {}

  async loadInitialPokemon(): Promise<void> {
    await this.loadPokemon(1, 20);
  }

  async loadAdditionalPokemon(): Promise<void> {
    await this.loadPokemon(21, 151);
  }

  async loadPokemon(startId: number, endId: number): Promise<void> {
    const promises = [];
    for (let i = startId; i <= endId; i++) {
      promises.push(this.fetchPokemonById(i));
    }

    const results = await Promise.allSettled(promises);
    results.forEach((result) => {
      if (result.status === 'fulfilled' && result.value) {
        this.storePokemon(result.value);
      }
    });
  }

  async fetchPokemonById(id: number): Promise<any> {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    return this.http.get<any>(url).toPromise();
  }

 storePokemon(pokemon: any): void {
    pokemon.name = this.formatPokemonName(pokemon.name);
    this.pokemonData.push(pokemon);
  }
  
  formatPokemonName(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  findPokemonByName(pokemonName: string): any | undefined {
    return this.pokemonData.find(
      (pokemon) => pokemon.name.toLowerCase() === pokemonName.toLowerCase()
    );
  }
}