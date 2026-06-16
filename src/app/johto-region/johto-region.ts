import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaderInfo } from '../leader-info/leader-info';
import { GymLeader } from '../hoenn-leader.service';

@Component({
  selector: 'app-johto-region',
  standalone: true,
  imports: [CommonModule, LeaderInfo],
  templateUrl: './johto-region.html',
  styleUrl: './johto-region.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JohtoRegion {
  johtoLeaders = signal<GymLeader[]>([
    {
      name: 'Falkner', age: 17, location: 'Violet City', badge: 'Zephyr Badge', typeColor: '#A890F0',
      intro: 'I will prove to you that bird Pokémon can fly high above any obstacle!',
      team: [{ name: 'Pidgey', level: 7 }, { name: 'Pidgeotto', level: 9 }]
    },
    {
      name: 'Bugsy', age: 12, location: 'Azalea Town', badge: 'Hive Badge', typeColor: '#A8B820',
      intro: 'I am the walking encyclopedia of insect life! My bugs will lock you in their web.',
      team: [{ name: 'Scyther', level: 17 }, { name: 'Metapod', level: 15 }, { name: 'Kakuna', level: 15 }]
    },
    {
      name: 'Whitney', age: 16, location: 'Goldenrod City', badge: 'Plain Badge', typeColor: '#A8A878',
      intro: 'Don’t let my cute Normal-types fool you! Get ready to face the rolling power of Miltank!',
      team: [{ name: 'Clefairy', level: 18 }, { name: 'Miltank', level: 20 }]
    },
    {
      name: 'Morty', age: 23, location: 'Ecruteak City', badge: 'Fog Badge', typeColor: '#705898',
      intro: 'I can see the unseen ghosts floating around us. Can you attack what you cannot touch?',
      team: [{ name: 'Gastly', level: 21 }, { name: 'Haunter', level: 21 }, { name: 'Gengar', level: 25 }]
    },
    {
      name: 'Chuck', age: 31, location: 'Cianwood City', badge: 'Storm Badge', typeColor: '#C03028',
      intro: 'We train under crashing waterfalls to harden our bodies and spirits! Stand firm!',
      team: [{ name: 'Primeape', level: 29 }, { name: 'Poliwrath', level: 31 }]
    },
    {
      name: 'Jasmine', age: 18, location: 'Olivine City', badge: 'Mineral Badge', typeColor: '#B8B8D0',
      intro: 'Do you know about the newly discovered Steel type? It is cold, shiny, and completely unbreakable!',
      team: [{ name: 'Magnemite', level: 30 }, { name: 'Magnemite', level: 30 }, { name: 'Steelix', level: 35 }]
    },
    {
      name: 'Pryce', age: 70, location: 'Mahogany Town', badge: 'Glacier Badge', typeColor: '#98D8D8',
      intro: 'I have trained alongside ice fields for over fifty years. Feel the biting freeze of experience.',
      team: [{ name: 'Seel', level: 30 }, { name: 'Dewgong', level: 32 }, { name: 'Piloswine', level: 34 }]
    },
    {
      name: 'Clair', age: 24, location: 'Blackthorn City', badge: 'Rising Badge', typeColor: '#7038F8',
      intro: 'I hold the bloodlines of ancient dragon tamers! You are not prepared for this mythical might.',
      team: [{ name: 'Dragonair', level: 35 }, { name: 'Dragonair', level: 35 }, { name: 'Dragonair', level: 35 }, { name: 'Kingdra', level: 40 }]
    }
  ]);
}