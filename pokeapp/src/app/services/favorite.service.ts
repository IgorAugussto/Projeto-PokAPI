// src/app/services/favorite.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FavoriteService {
  private key = 'favoritePokemons';

  getFavorites(): number[] {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }

  isFavorite(id: number): boolean {
    return this.getFavorites().includes(id);
  }

  toggleFavorite(id: number): void {
    const favorites = this.getFavorites();
    if (favorites.includes(id)) {
      const updated = favorites.filter(pokeId => pokeId !== id);
      localStorage.setItem(this.key, JSON.stringify(updated));
    } else {
      favorites.push(id);
      localStorage.setItem(this.key, JSON.stringify(favorites));
    }
  }
}
