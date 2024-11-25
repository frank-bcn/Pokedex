import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadPokemonService } from './load-pokemon.service';
import { SelectedPokemonService } from './selected-pokemon.service';

@Injectable({
  providedIn: 'root',
})
export class LoadEvolutionService {
  evolution: any = null;
  evolutionPokemons: any[] = [];

  constructor(
    private http: HttpClient,
    private lp: LoadPokemonService,
    private sp: SelectedPokemonService
  ) {}

  async loadEvolution(speciesUrl: string): Promise<void> {
    try {
      const speciesData = await this.http.get<any>(speciesUrl).toPromise();
      const evolutionUrl = speciesData.evolution_chain.url;
      this.evolution = await this.loadEvolutionData(evolutionUrl);
    } catch (error) {
      console.error('Error fetching evolution chain:', error);
    }
  }

  async loadEvolutionData(url: string): Promise<any> {
    try {
      const evolutionData = await this.http.get<any>(url).toPromise();
      return evolutionData.chain;
    } catch (error) {
      console.error('Error fetching evolution chain data:', error);
      throw error;
    }
  }
  

  async loadEvolutionPokemons(): Promise<void> {
    if (!this.evolution) {
      return;
    }

    this.evolutionPokemons = [];
    let current = this.evolution;

    while (current) {
      const pokemonData = await this.loadPokemonDataBySpeciesUrl(
        current.species.url
      );
      this.evolutionPokemons.push(pokemonData);
      current = current.evolves_to[0];
    }
  }

  async loadPokemonDataBySpeciesUrl(speciesUrl: string): Promise<any> {
    try {
      return await this.http.get<any>(speciesUrl).toPromise();
    } catch (error) {
      throw error;
    }
  }

  createEvolutionList(): any[] {
    if (!this.evolution) {
      return [];
    }
  
    const evolutions = [];
    let current = this.evolution;
  
    while (current) {
      const evoName = current.species.name;
      const evoConditions = current.evolution_details.map((detail: { trigger: { name: any; }; min_level: any; item: { name: any; }; time_of_day: any; location: { name: any; }; gender: any; }) => ({
        trigger: detail.trigger.name,
        minLevel: detail.min_level,
        item: detail.item?.name,
        timeOfDay: detail.time_of_day,
        location: detail.location?.name,
        gender: detail.gender,
      }));
  
      const evoData = {
        name: evoName,
        conditions: evoConditions,
        pokemonData: this.lp.findPokemonByName(evoName),
      };
  
      evolutions.push(evoData);
      current = current.evolves_to[0]; // Nächste Evolution
    }
  
    return evolutions;
  }
  

  

  completeEvolutionImages(): boolean {
    if (!this.evolution) {
      return false;
    }

    const evolutions = this.createEvolutionList();

    return evolutions.every((evo) => {
      const matchingPokemon = this.lp.pokemonData.find(
        (poke) => poke.name.toLowerCase() === evo.name.toLowerCase()
      );
      return (
        matchingPokemon &&
        matchingPokemon.sprites?.other['official-artwork']?.front_default
      );
    });
  }

  onlySelectedPokemonInEvolution(): boolean {
    if (!this.evolution) {
      return false;
    }

    const evolutions = this.createEvolutionList();
    return (
      evolutions.length === 0 ||
      (evolutions.length === 1 &&
        evolutions[0].name.toLowerCase() ===
          this.sp.selectedPokemon?.name.toLowerCase())
    );
  }

  canShowEvolution(): boolean {
    return (
      this.completeEvolutionImages() &&
      !this.onlySelectedPokemonInEvolution()
    );
  }
}