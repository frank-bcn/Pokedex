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

  /*
   * loadEvolution: Diese Methode lädt die Evolutionsdaten für ein Pokémon anhand der übergebenen URL zur Spezies.
   * Sie lädt zuerst die Spezies-Daten und anschließend die Evolutionskette, wenn diese verfügbar ist.
   *
   * @param speciesUrl - Die URL, die zu den Spezies-Daten des Pokémon führt.
   * @returns - Ein Promise, das beim Abschluss der Ladeoperation aufgelöst wird.
   */
  async loadEvolution(speciesUrl: string): Promise<void> {
    try {
      const speciesData = await this.http.get<any>(speciesUrl).toPromise();
      const evolutionUrl = speciesData.evolution_chain.url;
      this.evolution = await this.loadEvolutionData(evolutionUrl);
    } catch (error) {}
  }

  /*
   * loadEvolutionData: Diese Methode lädt die Evolutionsdaten von einer gegebenen URL.
   * Sie sendet eine HTTP-Anfrage an die URL und gibt die Evolutionskette zurück, wenn die Anfrage erfolgreich ist.
   *
   * @param url - Die URL, die zu den Evolutionsdaten führt.
   * @returns - Ein Promise, das die Evolutionskette zurückgibt, wenn die Daten erfolgreich geladen wurden.
   * @throws - Wirft einen Fehler, wenn beim Laden der Evolutionsdaten ein Fehler auftritt.
   */
  async loadEvolutionData(url: string): Promise<any> {
    try {
      const evolutionData = await this.http.get<any>(url).toPromise();
      return evolutionData.chain;
    } catch (error) {
      console.error('Error fetching evolution chain data:', error);
      throw error;
    }
  }

  /*
   * loadEvolutionPokemons: Diese Methode lädt die Pokémon-Daten entlang der Evolutionskette,
   * beginnend mit dem aktuellen Pokémon und iteriert über die gesamte Evolutionskette.
   *
   * @returns - Ein Promise, das die Pokémon-Daten entlang der Evolutionskette lädt.
   */
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

  /*
   * loadPokemonDataBySpeciesUrl: Diese Methode lädt die Pokémon-Daten basierend auf einer gegebenen URL zur Spezies.
   * Sie sendet eine HTTP-Anfrage an die URL und gibt die Daten des Pokémon zurück, wenn die Anfrage erfolgreich ist.
   *
   * @param speciesUrl - Die URL, die zu den Spezies-Daten des Pokémon führt.
   * @returns - Ein Promise, das die Pokémon-Daten zurückgibt, wenn die Anfrage erfolgreich war.
   * @throws - Wirft den Fehler weiter, falls beim Laden der Pokémon-Daten ein Fehler auftritt.
   */
  async loadPokemonDataBySpeciesUrl(speciesUrl: string): Promise<any> {
    try {
      return await this.http.get<any>(speciesUrl).toPromise();
    } catch (error) {
      throw error;
    }
  }

  /*
   * createEvolutionList: Diese Methode erstellt eine Liste der Pokémon in der Evolutionskette,
   * beginnend mit dem aktuellen Pokémon und geht dann jede Evolution in der Kette durch.
   * Sie extrahiert die Evolutionsdetails und die Bedingungen für jede Evolution.
   *
   * @returns - Ein Array von Evolutionsdaten, das die Namen der Pokémon, ihre Evolutionsbedingungen
   *            und die zugehörigen Pokémon-Daten enthält.
   */
  createEvolutionList(): any[] {
    if (!this.evolution) {
      return [];
    }

    const evolutions = [];
    let current = this.evolution;

    while (current) {
      const evoName = current.species.name;
      const evoConditions = current.evolution_details.map(
        (detail: {
          trigger: { name: any };
          min_level: any;
          item: { name: any };
          time_of_day: any;
          location: { name: any };
          gender: any;
        }) => ({
          trigger: detail.trigger.name,
          minLevel: detail.min_level,
          item: detail.item?.name,
          timeOfDay: detail.time_of_day,
          location: detail.location?.name,
          gender: detail.gender,
        })
      );

      const evoData = {
        name: evoName,
        conditions: evoConditions,
        pokemonData: this.lp.findPokemonByName(evoName),
      };

      evolutions.push(evoData);
      current = current.evolves_to[0];
    }

    return evolutions;
  }

  /*
   * completeEvolutionImages: Diese Methode prüft, ob für alle Pokémon in der Evolutionskette
   * die entsprechenden "official artwork"-Bilder vorhanden sind.
   *
   * @returns - Ein Boolean (true oder false), der angibt, ob alle Pokémon in der Evolutionskette
   *            über das "official artwork"-Bild verfügen.
   */
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

  /*
   * onlySelectedPokemonInEvolution: Diese Methode prüft, ob das einzige Pokémon in der Evolutionskette
   * das aktuell ausgewählte Pokémon ist. Wenn die Evolutionskette leer ist oder nur das ausgewählte Pokémon
   * in der Kette enthalten ist, gibt die Methode true zurück.
   *
   * @returns - Ein Boolean (true oder false), der angibt, ob entweder keine oder nur das ausgewählte Pokémon
   *            in der Evolutionskette vorhanden ist.
   */
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

  /*
   * canShowEvolution: Diese Methode prüft, ob die Evolutionskette angezeigt werden kann.
   * Sie überprüft, ob alle "official artwork"-Bilder der Pokémon in der Evolutionskette vorhanden sind
   * und ob nicht nur das ausgewählte Pokémon in der Kette vorhanden ist.
   *
   * @returns - Ein Boolean (true oder false), der angibt, ob die Evolutionskette angezeigt werden kann.
   */
  canShowEvolution(): boolean {
    return (
      this.completeEvolutionImages() && !this.onlySelectedPokemonInEvolution()
    );
  }
}