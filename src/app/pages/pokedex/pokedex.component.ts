import { Component } from '@angular/core';
import { SelectedPokemonService } from '../../services/selected-pokemon.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent {

 

    constructor(public sp: SelectedPokemonService) { }

  }