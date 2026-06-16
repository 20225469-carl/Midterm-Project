import { Injectable, signal, computed } from '@angular/core';

export interface Pokemon {
  name: string;
  region: 'Kanto' | 'Johto' | 'Hoenn';
  type: string;
  heldItem: string;
  description: string;
  emoji: string;
}

export interface MartItem {
  id: number;
  name: string;
  price: number;
  description: string;
  emoji: string;
}

export interface CartItem {
  product: MartItem;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class PokemonMartService {
  private favoritePokemon = signal<Pokemon[]>([
    { name: 'Charizard', region: 'Kanto', type: 'Fire / Flying', heldItem: 'Charizardite Y', description: 'It flies around the sky in search of powerful opponents.', emoji: '🔥' },
    { name: 'Gengar', region: 'Kanto', type: 'Ghost / Poison', heldItem: 'Life Orb', description: 'Hides in shadows. It is said that if Gengar is hiding, it cools the area.', emoji: '👻' },
    { name: 'Tyranitar', region: 'Johto', type: 'Rock / Dark', heldItem: 'Assault Vest', description: 'Its body cannot be harmed by any sort of attack, so it is very eager to fight.', emoji: '🦖' },
    { name: 'Ampharos', region: 'Johto', type: 'Electric', heldItem: 'Magnet', description: 'The light from its tail can be seen from space. It used to be used as a beacon.', emoji: '⚡' },
    { name: 'Sceptile', region: 'Hoenn', type: 'Grass', heldItem: 'Miracle Seed', description: 'The leaves growing on its arms can slice down thick trees with swift agility.', emoji: '🦎' },
    { name: 'Metagross', region: 'Hoenn', type: 'Steel / Psychic', heldItem: 'Choice Band', description: 'With four brains, it has the intelligence of a supercomputer to calculate combat.', emoji: '🤖' }
  ]);

  private martCatalog = signal<MartItem[]>([
    { id: 1, name: 'Poké Ball', price: 200, description: 'A device for catching wild Pokémon.', emoji: '🔴' },
    { id: 2, name: 'Great Ball', price: 600, description: 'A high-performance Ball with a higher catch rate.', emoji: '🔵' },
    { id: 3, name: 'Ultra Ball', price: 1200, description: 'An ultra-performance Ball with an excellent catch rate.', emoji: '🟡' },
    { id: 4, name: 'Potion', price: 300, description: 'Restores a Pokémon’s HP by 20 points.', emoji: '🧪' },
    { id: 5, name: 'Super Potion', price: 700, description: 'Restores a Pokémon’s HP by 60 points.', emoji: '🥤' },
    { id: 6, name: 'Hyper Potion', price: 1500, description: 'Restores a Pokémon’s HP by 200 points.', emoji: '🥛' },
    { id: 7, name: 'Revive', price: 1500, description: 'Revives a fainted Pokémon with half its max HP.', emoji: '💎' },
    { id: 8, name: 'Full Heal', price: 600, description: 'Heals all status conditions of a single Pokémon.', emoji: '💊' },
    { id: 9, name: 'Max Elixir', price: 4500, description: 'Fully restores PP for all moves of a Pokémon.', emoji: '🍶' },
    { id: 10, name: 'Rare Candy', price: 10000, description: 'An energy-filled candy that raises a Pokémon by one level.', emoji: '🍬' }
  ]);

  private shoppingCart = signal<CartItem[]>([]);

  pokemonList = this.favoritePokemon.asReadonly();
  martItems = this.martCatalog.asReadonly();
  cart = this.shoppingCart.asReadonly();

  cartTotal = computed(() => {
    return this.shoppingCart().reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  });

  addToCart(item: MartItem) {
    const currentCart = this.shoppingCart();
    const existingItemIndex = currentCart.findIndex(cartItem => cartItem.product.id === item.id);

    if (existingItemIndex > -1) {
      const updatedCart = [...currentCart];
      updatedCart[existingItemIndex].quantity += 1;
      this.shoppingCart.set(updatedCart);
    } else {
      this.shoppingCart.set([...currentCart, { product: item, quantity: 1 }]);
    }
  }

  removeFromCart(itemId: number) {
    const currentCart = this.shoppingCart();
    const itemIndex = currentCart.findIndex(cartItem => cartItem.product.id === itemId);

    if (itemIndex > -1) {
      const updatedCart = [...currentCart];
      if (updatedCart[itemIndex].quantity > 1) {
        updatedCart[itemIndex].quantity -= 1;
      } else {
        updatedCart.splice(itemIndex, 1);
      }
      this.shoppingCart.set(updatedCart);
    }
  }

  clearCart() {
    this.shoppingCart.set([]);
  }
}