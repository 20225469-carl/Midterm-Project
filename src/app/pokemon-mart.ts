// src/app/pokemart/pokemart.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonMartService, MartItem } from '../pokemon-mart.service';
import { ItemCardComponent } from './item-card.component';

@Component({
  selector: 'app-pokemart',
  standalone: true,
  imports: [CommonModule, ItemCardComponent],
  template: `
    <div class="mart-layout">
      <div class="catalog-section">
        <h2 class="section-title">🛒 Kiosk Ordering Terminal</h2>
        <div class="items-grid">
          @for (product of service.martItems(); track product.id) {
            <app-item-card 
              [item]="product" 
              (addToOrder)="handleAddItem($event)">
            </app-item-card>
          }
        </div>
      </div>

      <div class="basket-section">
        <h2 class="section-title">💼 Active Basket ({{ service.cartCount() }} items)</h2>
        
        @if (service.cart().length === 0) {
          <div class="empty-notice">
            <span style="font-size: 3rem; display: block; margin-bottom: 10px;">🛒</span>
            <p>Your digital kiosk tray is currently empty. Tap items on the left to build your order.</p>
          </div>
        } @else {
          <div class="cart-list">
            @for (line of service.cart(); track line.product.id) {
              <div class="cart-line-item">
                <div class="line-meta">
                  <span class="line-emoji">{{ line.product.emoji }}</span>
                  <div>
                    <strong>{{ line.product.name }}</strong>
                    <p class="line-pricing">₽{{ line.product.price }} × {{ line.quantity }}</p>
                  </div>
                </div>
                <div class="line-actions">
                  <span class="line-subtotal">₽{{ line.product.price * line.quantity }}</span>
                  <div class="btn-group">
                    <button class="adjust-btn" (click)="service.removeFromCart(line.product.id)">−</button>
                    <button class="adjust-btn" (click)="service.addToCart(line.product)">+</button>
                  </div>
                </div>
              </div>
            }

            <div class="receipt-footer">
              <div class="total-row">
                <span>Estimated Total Due:</span>
                <strong class="total-amount">₽{{ service.cartTotal() }}</strong>
              </div>
              <button class="checkout-btn" (click)="processCheckout()">💳 Finalize Kiosk Checkout</button>
              <button class="clear-all-btn" (click)="service.clearCart()">🗑️ Cancel Order</button>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .mart-layout { display: grid; grid-template-columns: 2fr 1fr; gap: 30px; margin-top: 10px; }
    @media (max-width: 1024px) { .mart-layout { grid-template-columns: 1fr; } }
    
    .section-title { font-size: 1.4rem; color: #111827; margin-bottom: 20px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; font-weight: 700; }
    .items-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px; }
    
    .basket-section { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; height: fit-content; position: sticky; top: 20px; }
    .empty-notice { text-align: center; padding: 40px 10px; color: #9ca3af; line-height: 1.4; }
    
    .cart-line-item { display: flex; justify-content: space-between; align-items: center; background: white; padding: 12px; border-radius: 8px; margin-bottom: 10px; border: 1px solid #e5e7eb; }
    .line-meta { display: flex; gap: 10px; align-items: center; }
    .line-emoji { font-size: 1.4rem; }
    .line-pricing { margin: 2px 0 0 0; font-size: 0.8rem; color: #6b7280; }
    .line-actions { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; }
    .line-subtotal { font-weight: bold; color: #1f2937; font-size: 0.95rem; }
    
    .btn-group { display: flex; gap: 4px; }
    .adjust-btn { background: #f3f4f6; border: 1px solid #d1d5db; border-radius: 4px; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-weight: bold; cursor: pointer; }
    .adjust-btn:hover { background: #e5e7eb; }

    .receipt-footer { margin-top: 25px; border-top: 2px solid #e5e7eb; padding-top: 15px; }
    .total-row { display: flex; justify-content: space-between; font-size: 1.2rem; font-weight: bold; margin-bottom: 15px; }
    .total-amount { color: #10b981; }
    
    .checkout-btn { background: #cc0000; color: white; border: none; width: 100%; padding: 12px; border-radius: 6px; font-size: 1rem; font-weight: bold; cursor: pointer; margin-bottom: 8px; }
    .checkout-btn:hover { background: #b30000; }
    .clear-all-btn { background: transparent; color: #6b7280; border: 1px solid #d1d5db; width: 100%; padding: 8px; border-radius: 6px; font-size: 0.85rem; cursor: pointer; font-weight: 500; }
    .clear-all-btn:hover { background: #f9fafb; color: #ef4444; }
  `]
})
export class PokemartComponent {
  service = inject(PokemonMartService);

  // Handles data payload packets received from child custom component streams
  handleAddItem(item: MartItem) {
    this.service.addToCart(item);
  }

  processCheckout() {
    alert(`🛒 Order processed successfully!\nTotal charged: ₽${this.service.cartTotal()}\nThank you for using our Digital Kiosk!`);
    this.service.clearCart();
  }
}