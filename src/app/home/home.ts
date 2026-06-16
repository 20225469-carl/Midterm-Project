import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="homepage-container">
      <div class="hero-banner">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <span class="badge">SILPH CO. OFFICIAL PARTNER</span>
          <h1>Your Ultimate Regional Adventure Hub</h1>
          <p>Explore legendary gym leader strategies and gear up with professional battle supplies at our all-in-one digital kiosk.</p>
          <div class="hero-buttons">
            <button class="btn-primary" (click)="navigateTo('mart')">🛍️ Shop PokéMart</button>
            <button class="btn-secondary" (click)="navigateTo('showcase')">🌟 Elite Showcase</button>
          </div>
        </div>
      </div>

      <div class="features-section">
        <h2 class="section-title">Explore Our Departments</h2>
        <p class="section-subtitle">Select a destination below to view active rosters or browse retail goods.</p>
        
        <div class="features-grid">
          <div class="feature-card" (click)="navigateTo('kanto')">
            <div class="card-icon">🔴</div>
            <h3>Kanto Region</h3>
            <p>Analyze classic tactical profiles from Boulder to Rainbow gym badges.</p>
            <span class="card-link">View Roster →</span>
          </div>

          <div class="feature-card" (click)="navigateTo('johto')">
            <div class="card-icon">🔵</div>
            <h3>Johto Region</h3>
            <p>Study traditional strategies and historical lineages from native trainers.</p>
            <span class="card-link">View Roster →</span>
          </div>

          <div class="feature-card" (click)="navigateTo('hoenn')">
            <div class="card-icon">🟢</div>
            <h3>Hoenn Region</h3>
            <p>Review climate-adaptive battle formations and environmental tactics.</p>
            <span class="card-link">View Roster →</span>
          </div>

          <div class="feature-card store-highlight" (click)="navigateTo('mart')">
            <div class="card-icon">🛒</div>
            <h3>Silph PokéMart</h3>
            <p>Purchase custom tactical items, hold items, and professional restoration medicines.</p>
            <span class="card-link">Enter Shop →</span>
          </div>
        </div>
      </div>

  `,
  styles: [`
    .homepage-container { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #1f2937; }
    
    /* Premium E-commerce Hero Section */
    .hero-banner { 
      position: relative; 
      background: linear-gradient(135deg, #1e1e24 0%, #cc0000 100%); 
      border-radius: 16px; 
      padding: 60px 40px; 
      color: white; 
      overflow: hidden;
      margin-bottom: 50px;
      box-shadow: 0 10px 25px -5px rgba(204, 0, 0, 0.15);
    }
    .hero-content { position: relative; max-width: 600px; z-index: 2; }
    .hero-content .badge { background: rgba(255, 255, 255, 0.2); color: #fff; font-size: 0.75rem; padding: 4px 12px; border-radius: 20px; font-weight: 700; letter-spacing: 0.05em; }
    .hero-content h1 { font-size: 2.6rem; margin: 15px 0; font-weight: 800; line-height: 1.2; letter-spacing: -0.02em; }
    .hero-content p { font-size: 1.1rem; line-height: 1.5; opacity: 0.9; margin-bottom: 30px; }
    
    .hero-buttons { display: flex; gap: 15px; }
    .btn-primary { background: white; color: #cc0000; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 700; font-size: 1rem; cursor: pointer; transition: all 0.2s; }
    .btn-primary:hover { background: #f3f4f6; transform: translateY(-2px); }
    .btn-secondary { background: transparent; color: white; border: 2px solid rgba(255,255,255,0.6); padding: 10px 22px; border-radius: 8px; font-weight: 700; font-size: 1rem; cursor: pointer; transition: all 0.2s; }
    .btn-secondary:hover { background: rgba(255,255,255,0.1); border-color: white; transform: translateY(-2px); }

    /* Department Categories Grid */
    .features-section { text-align: center; margin-bottom: 50px; }
    .section-title { font-size: 1.8rem; font-weight: 800; color: #111827; margin: 0 0 8px 0; }
    .section-subtitle { color: #6b7280; font-size: 1rem; margin: 0 0 35px 0; }
    
    .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; }
    .feature-card { background: white; border: 1px solid #e5e7eb; border-radius: 12px; padding: 25px 20px; text-align: left; cursor: pointer; transition: all 0.25s ease; display: flex; flex-direction: column; }
    .feature-card:hover { transform: translateY(-5px); border-color: #cbd5e1; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); }
    
    .card-icon { font-size: 2rem; margin-bottom: 15px; }
    .feature-card h3 { font-size: 1.2rem; font-weight: 700; margin: 0 0 10px 0; color: #111827; }
    .feature-card p { font-size: 0.9rem; color: #4b5563; line-height: 1.4; margin: 0 0 20px 0; flex-grow: 1; }
    .card-link { font-size: 0.85rem; font-weight: 700; color: #cc0000; }
    
    /* Special highlight decoration flag for the shopping tab */
    .store-highlight { border: 2px solid #fecaca; background: #fffdfd; }
    .store-highlight:hover { border-color: #ef4444; }

    /* Bottom Trust Elements row */
    .trust-footer { display: flex; justify-content: space-around; gap: 20px; border-top: 1px solid #e5e7eb; padding-top: 40px; margin-top: 20px; }
    @media (max-width: 768px) { .trust-footer { flex-direction: column; gap: 25px; align-items: flex-start; padding-left: 20px; } }
    .badge-item { display: flex; gap: 15px; align-items: center; }
    .badge-icon { font-size: 1.8rem; background: #f3f4f6; padding: 10px; border-radius: 50%; }
    .badge-item h4 { margin: 0 0 2px 0; font-size: 0.95rem; font-weight: 700; color: #111827; }
    .badge-item p { margin: 0; font-size: 0.8rem; color: #6b7280; }
  `]
})
export class Home {
  private router = inject(Router);

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}