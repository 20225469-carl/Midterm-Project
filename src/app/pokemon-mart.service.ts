import { Injectable, signal, computed } from '@angular/core';

export interface MartItem {
  id: number;
  name: string;
  price: number;
  description: string;
  emoji: string;
  category: 'Balls' | 'Medicine' | 'Hold Items';
}

export interface CartItem {
  product: MartItem;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class PokemonMartService {
  private martCatalog = signal<MartItem[]>([
    { id: 1, name: 'Poké Ball', price: 200, description: 'Standard device for catching wild Pokémon.', emoji: '🔴', category: 'Balls' },
    { id: 2, name: 'Great Ball', price: 600, description: 'High-performance Ball with a higher success rate.', emoji: '🔵', category: 'Balls' },
    { id: 3, name: 'Ultra Ball', price: 1200, description: 'Ultra-performance Ball with an excellent catch rate.', emoji: '🟡', category: 'Balls' },
    { id: 4, name: 'Master Ball', price: 0, description: 'The ultimate Ball that catches any wild Pokémon without fail.', emoji: '💜', category: 'Balls' },
    { id: 5, name: 'Potion', price: 300, description: 'Restores a Pokémon’s HP by 20 points.', emoji: '🧪', category: 'Medicine' },
    { id: 6, name: 'Super Potion', price: 700, description: 'Restores a Pokémon’s HP by 60 points.', emoji: '🥤', category: 'Medicine' },
    { id: 7, name: 'Hyper Potion', price: 1500, description: 'Restores a Pokémon’s HP by 200 points.', emoji: '🥛', category: 'Medicine' },
    { id: 8, name: 'Max Potion', price: 2500, description: 'Fully restores the HP of a single Pokémon.', emoji: '🧴', category: 'Medicine' },
    { id: 9, name: 'Full Restore', price: 3000, description: 'Fully restores HP and heals all status conditions.', emoji: '🟢', category: 'Medicine' },
    { id: 10, name: 'Revive', price: 1500, description: 'Revives a fainted Pokémon with half its max HP.', emoji: '💎', category: 'Medicine' },
    { id: 11, name: 'Full Heal', price: 600, description: 'Heals all status conditions of a single Pokémon.', emoji: '💊', category: 'Medicine' },
    { id: 12, name: 'Rare Candy', price: 10000, description: 'An energy-filled candy that raises a Pokémon by one level.', emoji: '🍬', category: 'Medicine' },
    { id: 13, name: 'Life Orb', price: 4000, description: 'Boosts move power but damages the user on attack.', emoji: '🔮', category: 'Hold Items' },
    { id: 14, name: 'Choice Band', price: 5000, description: 'Boosts Attack but allows the use of only one chosen move.', emoji: '🎀', category: 'Hold Items' },
    { id: 15, name: 'Assault Vest', price: 4500, description: 'Raises Sp. Def but prevents the use of status moves.', emoji: '🎽', category: 'Hold Items' },
    { id: 16, name: 'Leftovers', price: 3500, description: 'Gradually restores HP during battle when held.', emoji: '🍏', category: 'Hold Items' }
  ]);

  private shoppingCart = signal<CartItem[]>([]);

  martItems = this.martCatalog.asReadonly();
  cart = this.shoppingCart.asReadonly();

  cartTotal = computed(() => {
    return this.shoppingCart().reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  });

  cartCount = computed(() => {
    return this.shoppingCart().reduce((sum, item) => sum + item.quantity, 0);
  });

  addToCart(item: MartItem) {
    const currentCart = this.shoppingCart();
    const existingIndex = currentCart.findIndex(cartItem => cartItem.product.id === item.id);

    if (existingIndex > -1) {
      const updatedCart = [...currentCart];
      updatedCart[existingIndex].quantity += 1;
      this.shoppingCart.set(updatedCart);
    } else {
      this.shoppingCart.set([...currentCart, { product: item, quantity: 1 }]);
    }
  }

  removeFromCart(itemId: number) {
    const currentCart = this.shoppingCart();
    const existingIndex = currentCart.findIndex(cartItem => cartItem.product.id === itemId);

    if (existingIndex > -1) {
      const updatedCart = [...currentCart];
      if (updatedCart[existingIndex].quantity > 1) {
        updatedCart[existingIndex].quantity -= 1;
      } else {
        updatedCart.splice(existingIndex, 1);
      }
      this.shoppingCart.set(updatedCart);
    }
  }

  clearCart() {
    this.shoppingCart.set([]);
  }
}