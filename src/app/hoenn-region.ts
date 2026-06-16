// src/app/hoenn-region.ts
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoennLeaderService } from './hoenn-leader.service';
import { LeaderInfo } from './leader-info/leader-info';

@Component({
  selector: 'app-hoenn-region',
  standalone: true,
  imports: [CommonModule, LeaderInfo],
  template: `
    <div class="region-container-box">
      <h1 class="region-title-main">
        <span class="decorative-circle"></span> Hoenn League Leaders
      </h1>
      
      <div class="leader-grid-layout">
        @for (item of leaderService.getLeaders(); track item.name) {
          <app-leader-info [leader]="item" />
        }
      </div>
    </div>
  `,
  styleUrls: ['./leader-info/leader-info.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HoennRegion {
  leaderService = inject(HoennLeaderService);
}