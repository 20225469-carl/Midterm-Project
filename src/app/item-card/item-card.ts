import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MartItem } from '../pokemon-mart.service';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="item-card" [ngClass]="item.category.toLowerCase().replace(' ', '-')">
      <div class="item-info">
        <span class="item-emoji">{{ item.emoji }}</span>
        <div>
          <span class="category-badge">{{ item.category }}</span>
          <h3>{{ item.name }}</h3>
          <p class="price-lbl">₽{{ item.price }}</p>
          <p class="desc-lbl">{{ item.description }}</p>
        </div>
      </div>
      <button class="add-btn" (click)="onAddClick()">+ Add to Order</button>
    </div>
  `,
  styles: [`
    .item-card { background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px; display: flex; flex-direction: column; justify-content: space-between; transition: transform 0.2s, box-shadow 0.2s; }
    .item-card:hover { transform: translateY(-3px); box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    
    /* Dynamic styling context depending on item category flags */
    .balls { border-left: 4px solid #ef4444; }
    .medicine { border-left: 4px solid #10b981; }
    .hold-items { border-left: 4px solid #3b82f6; }

    .item-info { display: flex; gap: 12px; align-items: flex-start; }
    .item-emoji { font-size: 1.8rem; background: #f3f4f6; padding: 8px; border-radius: 8px; }
    .category-badge { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.05em; color: #9ca3af; font-weight: bold; }
    .item-info h3 { margin: 2px 0 4px 0; font-size: 1.1rem; color: #1f2937; }
    .price-lbl { margin: 0 0 6px 0; font-weight: bold; color: #cc0000; font-size: 0.95rem; }
    .desc-lbl { margin: 0; font-size: 0.85rem; color: #6b7280; line-height: 1.3; }
    
    .add-btn { background: #1a1a1a; color: white; border: none; padding: 10px 12px; border-radius: 6px; font-weight: bold; cursor: pointer; margin-top: 15px; transition: background 0.2s; }
    .add-btn:hover { background: #cc0000; }
  `]
})
export class ItemCard {
  @Input({ required: true }) item!: MartItem;
  
  @Output() addToOrder = new EventEmitter<MartItem>();

  onAddClick() {
    this.addToOrder.emit(this.item);
  }
}