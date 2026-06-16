import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonMartService } from './pokemon-mart.service';

@Component({
  selector: 'app-pokemart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mart-layout">
      
      <div class="catalog-section">
        <h2 class="section-title">🛒 Available Mart Inventory</h2>
        <div class="items-grid">
          @for (item of service.martItems(); track item.id) {
            <div class="item-card">
              <div class="item-info">
                <span class="item-emoji">{{ item.emoji }}</span>
                <div>
                  <h3>{{ item.name }}</h3>
                  <p class="price-lbl">{{ item.price }} PokéDollars</p>
                  <p class="desc-lbl">{{ item.description }}</p>
                </div>
              </div>
              <button class="add-btn" (click)="service.addToCart(item)">+ Purchase Item</button>
            </div>
          }
        </div>
      </div>

      <div class="basket-section">
        <h2 class="section-title">🎒 Your Adventure Bag</h2>
        
        @if (service.cart().length === 0) {
          <div class="empty-notice">
            <p>Your shopping basket is currently empty.</p>
            <span style="font-size: 3rem;">🎒</span>
          </div>
        } @else {
          <div class="cart-list">
            @for (line of service.cart(); track line.product.id) {
              <div class="cart-line-item">
                <div class="line-meta">
                  <span>{{ line.product.emoji }}</span>
                  <div>
                    <strong>{{ line.product.name }}</strong>
                    <p>{{ line.product.price }} x {{ line.quantity }}</p>
                  </div>
                </div>
                <div class="line-actions">
                  <span class="line-subtotal">₽{{ line.product.price * line.quantity }}</span>
                  <button class="del-btn" (click)="service.removeFromCart(line.product.id)">🗑️</button>
                </div>
              </div>
            }

            <div class="receipt-footer">
              <div class="total-row">
                <span>Grand Total:</span>
                <strong class="total-amount">₽{{ service.cartTotal() }}</strong>
              </div>
              <button class="checkout-btn" (click)="processCheckout()">💳 Finalize Invoice Checkout</button>
            </div>
          </div>
        }

      </div>
    </div>
  `,
  styles: [`
    .mart-layout { display: grid; grid-template-columns: 2fr 1fr; gap: 30px; margin-top: 20px; }
    @media (max-width: 900px) { .mart-layout { grid-template-columns: 1fr; } }
    .section-title { font-size: 1.5rem; color: #111827; margin-bottom: 20px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; }
    .items-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
    @media (max-width: 600px) { .items-grid { grid-template-columns: 1fr; } }
    
    .item-card { background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
    .item-info { display: flex; gap: 12px; align-items: flex-start; }
    .item-emoji { font-size: 1.8rem; background: #f3f4f6; padding: 8px; border-radius: 8px; }
    .item-info h3 { margin: 0 0 4px 0; font-size: 1.1rem; }
    .price-lbl { margin: 0 0 6px 0; font-weight: bold; color: #dc2626; font-size: 0.95rem; }
    .desc-lbl { margin: 0; font-size: 0.85rem; color: #6b7280; }
    .add-btn { background: #2563eb; color: white; border: none; padding: 8px 12px; border-radius: 6px; font-weight: bold; cursor: pointer; margin-top: 15px; transition: background 0.2s; }
    .add-btn:hover { background: #1d4ed8; }

    .basket-section { background: #f9fafb; border: 2px dashed #d1d5db; border-radius: 12px; padding: 20px; height: fit-content; }
    .empty-notice { text-align: center; padding: 4px 0; color: #9ca3af; }
    .cart-line-item { display: flex; justify-content: space-between; align-items: center; background: white; padding: 12px; border-radius: 8px; margin-bottom: 10px; border: 1px solid #e5e7eb; }
    .line-meta { display: flex; gap: 10px; align-items: center; }
    .line-actions { display: flex; align-items: center; gap: 15px; }
    .line-subtotal { font-weight: bold; color: #374151; }
    .del-btn { background: none; border: none; cursor: pointer; font-size: 1.1rem; }
    
    .receipt-footer { margin-top: 25px; border-top: 2px solid #e5e7eb; padding-top: 15px; }
    .total-row { display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: bold; margin-bottom: 15px; }
    .total-amount { color: #16a34a; }
    .checkout-btn { background: #16a34a; color: white; border: none; width: 100%; padding: 12px; border-radius: 6px; font-size: 1rem; font-weight: bold; cursor: pointer; }
    .checkout-btn:hover { background: #15803d; }
  `]
})
export class PokemonMart {
  service = inject(PokemonMartService);

  processCheckout() {
    alert(`Transaction Successful! Handing over items. Total Charged: ₽${this.service.cartTotal()}`);
    this.service.clearCart();
  }
}