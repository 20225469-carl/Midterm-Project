import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaderInfo } from '../leader-info/leader-info';
import { GymLeader } from '../hoenn-leader.service';

@Component({
  selector: 'app-kanto-region',
  standalone: true,
  imports: [CommonModule, LeaderInfo],
  templateUrl: './kanto-region.html',
  styleUrl: './kanto-region.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KantoRegion {
  kantoLeaders = signal<GymLeader[]>([
    {
      name: 'Brock', age: 15, location: 'Pewter City', badge: 'Boulder Badge', typeColor: '#8B8589',
      intro: 'The Rock-Solid Pokémon Trainer. My defense is impossible to breach!',
      team: [{ name: 'Geodude', level: 12 }, { name: 'Onix', level: 14 }]
    },
    {
      name: 'Misty', age: 13, location: 'Cerulean City', badge: 'Cascade Badge', typeColor: '#3399FF',
      intro: 'The Tomboyish Mermaid! You will drown under my strategic blue waves.',
      team: [{ name: 'Staryu', level: 18 }, { name: 'Starmie', level: 21 }]
    },
    {
      name: 'Lt. Surge', age: 34, location: 'Vermilion City', badge: 'Thunder Badge', typeColor: '#FFCC00',
      intro: 'The Lightning American. I will shock your little team right out of the sky!',
      team: [{ name: 'Voltorb', level: 21 }, { name: 'Pikachu', level: 18 }, { name: 'Raichu', level: 24 }]
    },
    {
      name: 'Erika', age: 19, location: 'Celadon City', badge: 'Rainbow Badge', typeColor: '#77CC55',
      intro: 'The Nature-Loving Princess. My grass-type aroma therapy will stun your senses.',
      team: [{ name: 'Victreebel', level: 29 }, { name: 'Tangela', level: 24 }, { name: 'Vileplume', level: 29 }]
    },
    {
      name: 'Koga', age: 37, location: 'Fuchsia City', badge: 'Soul Badge', typeColor: '#A040A0',
      intro: 'Fwahahaha! A mere child cannot out-maneuver the shadows and poison of a ninja master!',
      team: [{ name: 'Koffing', level: 37 }, { name: 'Muk', level: 39 }, { name: 'Koffing', level: 37 }, { name: 'Weezing', level: 43 }]
    },
    {
      name: 'Sabrina', age: 21, location: 'Saffron City', badge: 'Marsh Badge', typeColor: '#F85888',
      intro: 'I had a vision of your defeat. My psychic powers transcend basic physical strengths.',
      team: [{ name: 'Kadabra', level: 38 }, { name: 'Mr. Mime', level: 37 }, { name: 'Venomoth', level: 38 }, { name: 'Alakazam', level: 43 }]
    },
    {
      name: 'Blaine', age: 58, location: 'Cinnabar Island', badge: 'Volcano Badge', typeColor: '#F08030',
      intro: 'You better have Burn Heal! My fiery dedication cannot be extinguished by an amateur!',
      team: [{ name: 'Growlithe', level: 42 }, { name: 'Ponyta', level: 40 }, { name: 'Rapidash', level: 42 }, { name: 'Magmar', level: 47 }]
    },
    {
      name: 'Giovanni', age: 44, location: 'Viridian City', badge: 'Earth Badge', typeColor: '#E0C068',
      intro: 'Welcome to my true hideout. I am the leader of Team Rocket, and the strongest Ground master!',
      team: [{ name: 'Rhyhorn', level: 45 }, { name: 'Dugtrio', level: 42 }, { name: 'Nidoqueen', level: 44 }, { name: 'Nidoking', level: 45 }, { name: 'Rhydon', level: 50 }]
    }
  ]);
}