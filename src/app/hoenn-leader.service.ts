import { Injectable, signal } from '@angular/core';

export interface PokemonMember {
  name: string;
  level: number;
}

export interface GymLeader {
  name: string;
  age: number;
  location: string;
  badge: string;
  typeColor: string;
  intro: string;
  team: PokemonMember[];
}

@Injectable({
  providedIn: 'root'
})
export class HoennLeaderService {
  private leadersRegistry = signal<GymLeader[]>([
    {
      name: 'Roxanne',
      age: 15,
      location: 'Rustboro City',
      badge: 'Stone Badge',
      typeColor: '#B8A038',
      intro: 'I am Roxanne, the Rock-type Gym Leader! I learned how to battle at the Trainer School!',
      team: [
        { name: 'Geodude', level: 12 },
        { name: 'Nosepass', level: 15 }
      ]
    },
    {
      name: 'Brawly',
      age: 19,
      location: 'Dewford Town',
      badge: 'Knuckle Badge',
      typeColor: '#C03028',
      intro: 'A big wave of talent is coming your way! Prepare to get washed out by fighting spirit!',
      team: [
        { name: 'Machop', level: 16 },
        { name: 'Makuhita', level: 19 }
      ]
    },
    {
      name: 'Wattson',
      age: 54,
      location: 'Mauville City',
      badge: 'Dynamo Badge',
      typeColor: '#F8D030',
      intro: 'Wahahaha! You have reached Mauville! Prepare for a shocking battle challenge!',
      team: [
        { name: 'Magnemite', level: 22 },
        { name: 'Voltorb', level: 20 },
        { name: 'Magneton', level: 23 }
      ]
    },
    {
      name: 'Flannery',
      age: 16,
      location: 'Lavaridge Town',
      badge: 'Heat Badge',
      typeColor: '#F08030',
      intro: 'Welcome... No, wait! I am Flannery, and my intense flames will melt your strategies right away!',
      team: [
        { name: 'Slugma', level: 24 },
        { name: 'Slugma', level: 24 },
        { name: 'Torkoal', level: 29 }
      ]
    },
    {
      name: 'Norman',
      age: 39,
      location: 'Petalburg City',
      badge: 'Balance Badge',
      typeColor: '#A8A878',
      intro: 'I am proud to face you here as a Gym Leader, but also as a true pursuer of ultimate battle balance.',
      team: [
        { name: 'Slaking', level: 28 },
        { name: 'Vigoroth', level: 30 },
        { name: 'Slaking', level: 31 }
      ]
    },
    {
      name: 'Winona',
      age: 22,
      location: 'Fortree City',
      badge: 'Feather Badge',
      typeColor: '#A890F0',
      intro: 'I am one with the wind, soaring gracefully high above! Let us see if your team can reach the skies!',
      team: [
        { name: 'Swellow', level: 31 },
        { name: 'Pelipper', level: 30 },
        { name: 'Skarmory', level: 32 },
        { name: 'Altaria', level: 33 }
      ]
    },
    {
      name: 'Tate & Liza',
      age: 11,
      location: 'Mossdeep City',
      badge: 'Mind Badge',
      typeColor: '#F85888',
      intro: 'We combine our thoughts into a singular psychic focus! Can you overcome our perfect dual harmony?',
      team: [
        { name: 'Lunatone', level: 42 },
        { name: 'Solrock', level: 42 }
      ]
    },
    {
      name: 'Wallace',
      age: 26,
      location: 'Sootopolis City',
      badge: 'Rain Badge',
      typeColor: '#6890F0',
      intro: 'Allow me to demonstrate an elegant illusion of water and grace. Let our dynamic aquatic ballet begin!',
      team: [
        { name: 'Luvdisc', level: 41 },
        { name: 'Whiscash', level: 41 },
        { name: 'Sealeo', level: 43 },
        { name: 'Milotic', level: 43 }
      ]
    }
  ]);

  getLeaders = this.leadersRegistry.asReadonly();
}