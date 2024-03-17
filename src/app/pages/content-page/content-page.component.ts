import { Component } from '@angular/core';
import { LoadPokemonService } from '../../services/load-pokemon.service';
import { SelectedPokemonService } from '../../services/selected-pokemon.service';

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrl: './content-page.component.scss'
})
export class ContentPageComponent {


  constructor(public lp: LoadPokemonService, public sp: SelectedPokemonService) { }

  ngOnInit() {
    this.lp.loadAllPokemonData();
  }
}
