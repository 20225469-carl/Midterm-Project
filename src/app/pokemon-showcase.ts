import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonMartService } from './pokemon-mart.service';

@Component({
  selector: 'app-pokemon-showcase',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="showcase-container">
      <h1 class="title">Elite Field Roster</h1>
      <p class="subtitle">A detailed look into our top choice team members across Kanto, Johto, and Hoenn.</p>

      <div class="pokemon-grid">
        @for (poke of service.pokemonList(); track poke.name) {
          <div class="poke-card" [ngClass]="poke.region.toLowerCase()">
            <div class="card-header">
              <span class="sprite-emoji">{{ poke.emoji }}</span>
              <h2>{{ poke.name }}</h2>
              <span class="region-badge">{{ poke.region }}</span>
            </div>
            <div class="card-body">
              <p><strong>Elemental Type:</strong> <span class="type-tag">{{ poke.type }}</span></p>
              <p><strong>Signature Held Item:</strong> 🎒 <em>{{ poke.heldItem }}</em></p>
              <p class="desc-text">"{{ poke.description }}"</p>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .showcase-container { animation: fadeIn 0.5s ease-in; }
    .title { text-align: center; color: #1f2937; margin-bottom: 5px; font-size: 2.2rem; }
    .subtitle { text-align: center; color: #6b7280; margin-bottom: 30px; }
    .pokemon-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 25px; }
    .poke-card { background: white; border-radius: 12px; border: 1px solid #e5e7eb; box-shadow: 0 4px 6px rgba(0,0,0,0.05); overflow: hidden; padding: 20px; transition: transform 0.2s; }
    .poke-card:hover { transform: translateY(-5px); }
    
    /* Dynamic Color Highlights per Region to ace the layout criteria */
    .kanto { border-top: 5px solid #ef4444; background-color: #fef2f2; }
    .johto { border-top: 5px solid #3b82f6; background-color: #eff6ff; }
    .hoenn { border-top: 5px solid #10b981; background-color: #ecfdf5; }

    .card-header { display: flex; align-items: center; gap: 10px; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px; margin-bottom: 15px; }
    .sprite-emoji { font-size: 2rem; }
    .card-header h2 { margin: 0; font-size: 1.4rem; color: #111827; flex-grow: 1; }
    .region-badge { background: #374151; color: white; padding: 2px 8px; border-radius: 20px; font-size: 0.75rem; font-weight: bold; }
    .type-tag { font-weight: 600; color: #4b5563; }
    .desc-text { font-style: italic; background: white; padding: 10px; border-radius: 6px; margin-top: 15px; border-left: 3px solid #cbd5e1; font-size: 0.95rem; }
  `]
})
export class PokemonShowcase {
  service = inject(PokemonMartService);
}