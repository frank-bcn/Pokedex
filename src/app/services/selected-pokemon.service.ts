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

  /*
   * selectPokemon: Diese Methode setzt das angegebene Pokémon als das aktuell ausgewählte Pokémon.
   *
   * @param pokemon - Das Pokémon, das als ausgewählt markiert werden soll.
   */
  selectPokemon(pokemon: any): void {
    this.selectedPokemon = pokemon;
  }

  /*
   * close: Diese Methode setzt das aktuell ausgewählte Pokémon zurück, indem sie `selectedPokemon` auf `null` setzt.
   * Dadurch wird das Pokémon des aktuellen Auswahlprozesses entfernt.
   */
  close(): void {
    this.selectedPokemon = null;
  }

  /*
   * typeColor: Diese Methode gibt die entsprechende Farbe für einen Pokémon-Typ zurück.
   * Wenn der angegebene Typ in der `colors`-Datenstruktur vorhanden ist, wird die zugehörige Farbe zurückgegeben.
   * Andernfalls wird ein leerer String zurückgegeben.
   *
   * @param type - Der Pokémon-Typ, für den die Farbe bestimmt werden soll (z. B. 'fire', 'water').
   * @returns - Die Farbe, die dem angegebenen Typ zugeordnet ist, oder ein leerer String, wenn der Typ nicht gefunden wird.
   */
  typeColor(type: string): string {
    return this.colors[type] || '';
  }

  /*
   * singleTypeColor: Diese Methode gibt die Farbe des ersten Pokémon-Typs des aktuell ausgewählten Pokémon zurück.
   * Wenn das Pokémon keinen Typ hat oder der Typ nicht gefunden wird, wird ein leerer String zurückgegeben.
   *
   * @returns - Die Farbe des ersten Typs des ausgewählten Pokémon oder ein leerer String, wenn kein Typ vorhanden ist.
   */
  singleTypeColor(): string {
    const type = this.selectedPokemon.types[0]?.type?.name;
    return type ? this.typeColor(type) : '';
  }

  /*
   * gradientTypeColor: Diese Methode gibt einen linearen Farbverlauf (Gradient) zurück, der auf den Typen des
   * aktuell ausgewählten Pokémon basiert. Falls das Pokémon zwei Typen hat, wird der Farbverlauf zwischen beiden Typen erzeugt.
   *
   * @returns - Ein CSS-Gradient-String, der den Farbverlauf zwischen den beiden Typen des ausgewählten Pokémon darstellt.
   */
  gradientTypeColor(): string {
    const type1 = this.selectedPokemon.types[0]?.type?.name;
    const type2 = this.selectedPokemon.types[1]?.type?.name;

    const color1 = type1 ? this.typeColor(type1) : '';
    const color2 = type2 ? this.typeColor(type2) : '';

    return `linear-gradient(to bottom left, ${color1} 50%, ${color2} 50%)`;
  }

  /*
   * typeBackgroundColor: Diese Methode gibt die Hintergrundfarbe für das ausgewählte Pokémon basierend auf seinen Typen zurück.
   * Wenn das Pokémon nur einen Typ hat, wird die Farbe des Typs zurückgegeben. Wenn es zwei Typen hat, wird ein Farbverlauf erzeugt.
   *
   * @returns - Die Hintergrundfarbe für das ausgewählte Pokémon, entweder eine einzelne Farbe oder ein Farbverlauf.
   */
  typeBackgroundColor(): string {
    if (!this.selectedPokemon || !this.selectedPokemon.types) {
      return '';
    }

    return this.selectedPokemon.types.length === 1
      ? this.singleTypeColor()
      : this.gradientTypeColor();
  }
}