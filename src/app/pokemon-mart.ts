import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemCard } from './item-card/item-card';
import { PokemonMartService, MartItem } from './pokemon-mart.service';

@Component({
  selector: 'app-pokemart',
  standalone: true,
  imports: [CommonModule, ItemCard],
  template: `
    <div class="storefront-container">
      <div class="promo-banner">
        <h2>⚡ FREE DELIVERY ON ORDERS OVER ₽5,000 ⚡</h2>
        <p>Equip your team with official Silph Co. gear directly from our digital kiosk terminal.</p>
      </div>

      <div class="category-tabs">
        <button [class.active]="selectedCategory() === 'All'" (click)="setCategory('All')">🎒 All Products</button>
        <button [class.active]="selectedCategory() === 'Balls'" (click)="setCategory('Balls')">🔴 Poké Balls</button>
        <button [class.active]="selectedCategory() === 'Medicine'" (click)="setCategory('Medicine')">🧪 Medicine</button>
        <button [class.active]="selectedCategory() === 'Hold Items'" (click)="setCategory('Hold Items')">🔮 Hold Items</button>
      </div>

      <div class="main-shopping-grid">
        <div class="products-column">
          <h2 class="grid-title">Available Inventory ({{ filteredItems().length }})</h2>
          
          <div class="ecom-grid">
            @for (product of filteredItems(); track product.id) {
              <app-item-card 
                [item]="product" 
                (addToOrder)="handleAddItem($event)">
              </app-item-card>
            }
          </div>
        </div>

        <div class="cart-column">
          <div class="sticky-cart-card">
            <h2 class="cart-title">
              <span>🛒 Shopping Bag</span>
              <span class="badge">{{ service.cartCount() }}</span>
            </h2>

            @if (service.cart().length === 0) {
              <div class="empty-cart-state">
                <div class="bag-icon">🛍️</div>
                <h3>Your bag is empty</h3>
                <p>Add popular items from our catalog to customize your team's tactical loadout.</p>
              </div>
            } @else {
              <div class="cart-items-wrapper">
                @for (line of service.cart(); track line.product.id) {
                  <div class="cart-row">
                    <span class="row-emoji">{{ line.product.emoji }}</span>
                    <div class="row-details">
                      <h4>{{ line.product.name }}</h4>
                      <p class="unit-price">₽{{ line.product.price }} each</p>
                      
                      <div class="quantity-controls">
                        <button class="qty-btn" (click)="service.removeFromCart(line.product.id)">−</button>
                        <span class="qty-num">{{ line.quantity }}</span>
                        <button class="qty-btn" (click)="service.addToCart(line.product)">+</button>
                      </div>
                    </div>
                    <div class="row-subtotal">
                      ₽{{ line.product.price * line.quantity }}
                    </div>
                  </div>
                }
              </div>

              <div class="order-summary-box">
                <div class="summary-line">
                  <span>Subtotal</span>
                  <span>₽{{ service.cartTotal() }}</span>
                </div>
                <div class="summary-line">
                  <span>Shipping</span>
                  <span [style.color]="service.cartTotal() >= 5000 ? '#10b981' : '#1f2937'">
                    {{ service.cartTotal() >= 5000 ? 'FREE' : '₽200' }}
                  </span>
                </div>
                <div class="summary-line total-highlight">
                  <span>Estimated Total:</span>
                  <strong class="grand-total">₽{{ service.cartTotal() + (service.cartTotal() >= 5000 ? 0 : 200) }}</strong>
                </div>

                <button class="checkout-now-btn" (click)="processCheckout()">
                  🔒 Secure Invoice Checkout
                </button>
                <button class="abandon-cart-btn" (click)="service.clearCart()">
                  Empty Entire Bag
                </button>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .storefront-container { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #1f2937; margin-top: 10px; }
    
    /* E-commerce top promo banner style */
    .promo-banner { background: #fef2f2; border: 1px dashed #ef4444; border-radius: 8px; padding: 15px; text-align: center; margin-bottom: 25px; }
    .promo-banner h2 { margin: 0 0 4px 0; font-size: 1.05rem; color: #dc2626; letter-spacing: 0.05em; font-weight: 800; }
    .promo-banner p { margin: 0; font-size: 0.85rem; color: #7f1d1d; }

    /* Clean categorical ecom filtering navigation system */
    .category-tabs { display: flex; gap: 10px; margin-bottom: 25px; border-bottom: 2px solid #f3f4f6; padding-bottom: 12px; overflow-x: auto; }
    .category-tabs button { background: #ffffff; border: 1px solid #d1d5db; border-radius: 20px; padding: 8px 18px; font-size: 0.9rem; font-weight: 600; color: #4b5563; cursor: pointer; transition: all 0.2s ease; white-space: nowrap; }
    .category-tabs button:hover { background: #f9fafb; border-color: #9ca3af; color: #111827; }
    .category-tabs button.active { background: #1a1a1a; border-color: #1a1a1a; color: #ffffff; }

    /* Grid Layout Split Columns */
    .main-shopping-grid { display: grid; grid-template-columns: 7fr 3fr; gap: 30px; align-items: flex-start; }
    @media (max-width: 1024px) { .main-shopping-grid { grid-template-columns: 1fr; } }
    
    .grid-title { font-size: 1.3rem; font-weight: 700; margin: 0 0 20px 0; color: #111827; }
    .ecom-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px; }

    /* Sticky Sidebar Shopping Bag Context */
    .sticky-cart-card { background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); position: sticky; top: 20px; }
    .cart-title { display: flex; justify-content: space-between; align-items: center; font-size: 1.2rem; font-weight: 700; margin: 0 0 20px 0; padding-bottom: 12px; border-bottom: 1px solid #e5e7eb; }
    .cart-title .badge { background: #cc0000; color: #ffffff; font-size: 0.8rem; padding: 3px 10px; border-radius: 12px; font-weight: 700; }

    /* Empty Basket Visual Layouts */
    .empty-cart-state { text-align: center; padding: 30px 10px; }
    .bag-icon { font-size: 3rem; margin-bottom: 12px; }
    .empty-cart-state h3 { font-size: 1.05rem; font-weight: 600; margin: 0 0 6px 0; color: #374151; }
    .empty-cart-state p { margin: 0; font-size: 0.85rem; color: #6b7280; line-height: 1.4; }

    /* Custom Line Rows for Items in Cart */
    .cart-items-wrapper { max-height: 320px; overflow-y: auto; padding-right: 4px; margin-bottom: 20px; }
    .cart-row { display: flex; gap: 12px; padding: 12px 0; border-bottom: 1px solid #f3f4f6; align-items: center; }
    .cart-row:last-child { border-bottom: none; }
    .row-emoji { font-size: 1.5rem; background: #f3f4f6; padding: 6px; border-radius: 6px; }
    .row-details { flex-grow: 1; }
    .row-details h4 { margin: 0 0 2px 0; font-size: 0.95rem; font-weight: 600; color: #111827; }
    .unit-price { margin: 0 0 8px 0; font-size: 0.75rem; color: #6b7280; }
    
    /* Quantity Incrementor Buttons layout */
    .quantity-controls { display: flex; align-items: center; gap: 8px; }
    .qty-btn { background: #ffffff; border: 1px solid #cbd5e1; border-radius: 4px; width: 22px; height: 22px; font-size: 0.8rem; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; }
    .qty-btn:hover { background: #f1f5f9; border-color: #94a3b8; }
    .qty-num { font-size: 0.85rem; font-weight: 600; min-width: 14px; text-align: center; }
    .row-subtotal { font-weight: 700; font-size: 0.95rem; color: #1f2937; white-space: nowrap; }

    /* Invoice Totals Box Structure */
    .order-summary-box { border-top: 2px dashed #e5e7eb; padding-top: 15px; }
    .summary-line { display: flex; justify-content: space-between; font-size: 0.9rem; color: #4b5563; margin-bottom: 8px; }
    .total-highlight { border-top: 1px solid #f3f4f6; margin-top: 12px; padding-top: 12px; font-size: 1.1rem; color: #111827; }
    .grand-total { color: #10b981; font-size: 1.2rem; }

    /* Ecommerce Action Checkout Buttons */
    .checkout-now-btn { background: #cc0000; color: #ffffff; border: none; width: 100%; padding: 12px; border-radius: 8px; font-size: 0.95rem; font-weight: 700; cursor: pointer; margin-top: 12px; box-shadow: 0 2px 4px rgba(204,0,0,0.15); transition: background 0.2s; }
    .checkout-now-btn:hover { background: #b30000; }
    .abandon-cart-btn { background: transparent; color: #9ca3af; border: none; width: 100%; padding: 8px; margin-top: 6px; font-size: 0.8rem; font-weight: 500; cursor: pointer; border-radius: 6px; transition: all 0.2s; }
    .abandon-cart-btn:hover { background: #fff5f5; color: #ef4444; }
  `]
})
export class PokemonMart {
  service = inject(PokemonMartService);
  
  selectedCategory = signal<'All' | 'Balls' | 'Medicine' | 'Hold Items'>('All');

  setCategory(category: 'All' | 'Balls' | 'Medicine' | 'Hold Items') {
    this.selectedCategory.set(category);
  }

  filteredItems = () => {
    const currentFilter = this.selectedCategory();
    if (currentFilter === 'All') {
      return this.service.martItems();
    }
    return this.service.martItems().filter(item => item.category === currentFilter);
  };

  handleAddItem(item: MartItem) {
    this.service.addToCart(item);
  }

  processCheckout() {
    const finalTotal = this.service.cartTotal() + (this.service.cartTotal() >= 5000 ? 0 : 200);
    alert(`📦 Order Received!\nTotal Charged: ₽${finalTotal}\nItems are being sent to your Pokémon inventory storage box!`);
    this.service.clearCart();
  }
}