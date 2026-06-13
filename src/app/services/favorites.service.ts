import { Injectable, signal, computed } from '@angular/core';
import { IProduct } from '../interfaces/product.interface';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private favorites = signal<IProduct[]>(
    JSON.parse(localStorage.getItem('pcgamex-favorites') || '[]')
  );

  count = computed(() => this.favorites().length);
  items = computed(() => this.favorites());

  isFavorite(id: number) {
    return this.favorites().some(p => p.id === id);
  }

  toggle(product: IProduct) {
    if (this.isFavorite(product.id)) {
      this.favorites.update(list => list.filter(p => p.id !== product.id));
    } else {
      this.favorites.update(list => [...list, product]);
    }
    localStorage.setItem('pcgamex-favorites', JSON.stringify(this.favorites()));
  }

  remove(id: number) {
    this.favorites.update(list => list.filter(p => p.id !== id));
    localStorage.setItem('pcgamex-favorites', JSON.stringify(this.favorites()));
  }

  clear() {
    this.favorites.set([]);
    localStorage.removeItem('pcgamex-favorites');
  }
}