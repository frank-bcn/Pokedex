import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadPokemonService } from '../../services/load-pokemon.service';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],

})
export class StartPageComponent {

  constructor(public router: Router, public lp: LoadPokemonService) {}

  ngOnInit() {
    this.lp.loadAllPokemonData();
  }
}