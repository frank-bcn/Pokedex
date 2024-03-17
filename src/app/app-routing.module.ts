import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { PokedexComponent } from './pages/pokedex/pokedex.component';
import { ContentPageComponent } from './pages/content-page/content-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'start', pathMatch: 'full' },
  { path: 'start', component: StartPageComponent , data: { animation: 'start' } },
  { path: 'pokedex', component: ContentPageComponent , data: { animation: 'pokedex' } },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
