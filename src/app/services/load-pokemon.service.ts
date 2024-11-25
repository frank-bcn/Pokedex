import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoadPokemonService {
  pokemonData: any[] = [];

  constructor(private http: HttpClient) {}

  /*
   * loadInitialPokemon: Diese Methode lädt die ersten 20 Pokémon aus einer Datenquelle,
   * indem sie die `loadPokemon`-Methode mit den Parametern für die ersten 20 Pokémon aufruft.
   *
   * @returns - Ein Promise, das darauf wartet, dass die Pokémon-Daten erfolgreich geladen wurden.
   */
  async loadInitialPokemon(): Promise<void> {
    await this.loadPokemon(1, 20);
  }

  /*
   * loadAdditionalPokemon: Diese Methode lädt weitere Pokémon-Daten, beginnend mit Pokémon ID 21 bis 151,
   * indem sie die `loadPokemon`-Methode mit den entsprechenden Parametern aufruft.
   *
   * @returns - Ein Promise, das darauf wartet, dass die zusätzlichen Pokémon-Daten erfolgreich geladen wurden.
   */
  async loadAdditionalPokemon(): Promise<void> {
    await this.loadPokemon(21, 151);
  }

  /*
   * loadPokemon: Diese Methode lädt eine Reihe von Pokémon-Daten, beginnend mit einer `startId` bis zu einer `endId`.
   * Sie ruft für jedes Pokémon die `fetchPokemonById`-Methode auf und speichert die erfolgreichen Ergebnisse.
   *
   * @param startId - Die ID des ersten Pokémon, das geladen werden soll.
   * @param endId - Die ID des letzten Pokémon, das geladen werden soll.
   * @returns - Ein Promise, das darauf wartet, dass alle Pokémon-Daten geladen und gespeichert wurden.
   */
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

  /*
   * fetchPokemonById: Diese Methode ruft Pokémon-Daten von der API ab, basierend auf der angegebenen ID.
   * Sie verwendet die `http.get`-Methode, um eine GET-Anfrage an die Pokémon-API zu senden und die Daten abzurufen.
   *
   * @param id - Die ID des Pokémon, das abgerufen werden soll.
   * @returns - Ein Promise, das die Pokémon-Daten für die angegebene ID enthält.
   */
  async fetchPokemonById(id: number): Promise<any> {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    return this.http.get<any>(url).toPromise();
  }

  /*
   * storePokemon: Diese Methode speichert ein Pokémon in der internen Datenstruktur.
   * Bevor das Pokémon gespeichert wird, wird der Name des Pokémon mit der `formatPokemonName`-Methode formatiert.
   *
   * @param pokemon - Das Pokémon-Objekt, das gespeichert werden soll.
   */
  storePokemon(pokemon: any): void {
    pokemon.name = this.formatPokemonName(pokemon.name);
    this.pokemonData.push(pokemon);
  }

  /*
   * formatPokemonName: Diese Methode formatiert den Namen eines Pokémon, indem der erste Buchstabe
   * in Großbuchstaben umgewandelt wird und der Rest des Namens unverändert bleibt.
   *
   * @param name - Der Name des Pokémon, der formatiert werden soll.
   * @returns - Der formatierte Name des Pokémon, mit einem Großbuchstaben am Anfang.
   */
  formatPokemonName(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  /*
   * findPokemonByName: Diese Methode sucht ein Pokémon in der Liste der gespeicherten Pokémon (`pokemonData`)
   * anhand des Namens. Die Suche erfolgt unabhängig von der Groß- oder Kleinschreibung des Namens.
   *
   * @param pokemonName - Der Name des Pokémon, nach dem gesucht werden soll.
   * @returns - Das Pokémon-Objekt, das dem angegebenen Namen entspricht, oder `undefined`, wenn kein Pokémon gefunden wurde.
   */
  findPokemonByName(pokemonName: string): any | undefined {
    return this.pokemonData.find(
      (pokemon) => pokemon.name.toLowerCase() === pokemonName.toLowerCase()
    );
  }
}
