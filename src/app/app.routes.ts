import { Routes } from '@angular/router';
import { PokemonMart } from './pokemon-mart';
import { PokemonShowcase } from './pokemon-showcase';

export const routes: Routes = [
  { path: 'showcase', component: PokemonShowcase },
  { path: 'mart', component: PokemonMart },
  { path: '', redirectTo: 'showcase', pathMatch: 'full' },
  { path: '**', redirectTo: 'showcase' }
];