import { Routes } from '@angular/router';
import { Home } from './home/home'; 
import { KantoRegion } from './kanto-region/kanto-region';
import { JohtoRegion } from './johto-region/johto-region';
import { HoennRegion } from './hoenn-region'; 
import { LeaderInfo } from './leader-info/leader-info';
import { PokemonMart } from './pokemon-mart';
import { PokemonShowcase } from './pokemon-showcase';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'kanto', component: KantoRegion },
  { path: 'johto', component: JohtoRegion },
  { path: 'hoenn', component: HoennRegion }, 
  { path: 'leader-info', component: LeaderInfo },
  { path: 'showcase', component: PokemonShowcase },
  { path: 'mart', component: PokemonMart },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];