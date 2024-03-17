import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoadPokemonService {
  pokemonData: any[] = [];

  constructor(private http: HttpClient) {}

  async loadAllPokemonData() {
    for (let i = 1; i <= 152; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      try {
        const data = await this.http.get<any>(url).toPromise();
        this.pokemonData.push(data);
      } catch (error) {}
    }
  } 
}