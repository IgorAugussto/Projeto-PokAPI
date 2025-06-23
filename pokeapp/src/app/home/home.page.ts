import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { PokeApiService } from '../services/poke-api.service';
import { FavoriteService } from '../services/favorite.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  pokemons: any[] = [];
  offset = 0;
  limit = 20;
  loading = false;

  constructor(
    private pokeApi: PokeApiService,
    private favoriteService: FavoriteService,
    private router: Router,
  ) {}

  ionViewDidEnter() {
    this.loadMorePokemons();
  }

  loadMorePokemons() {
    this.loading = true;
    this.pokeApi.getPokemons(this.limit, this.offset).subscribe((data) => {
      this.pokemons.push(...data);
      this.offset += this.limit;
      this.loading = false;
    });
  }

  goToDetails(id: number) {
    this.router.navigate(['/details', id]);
  }

  isFavorite(id: number): boolean {
    return this.favoriteService.isFavorite(id);
  }

  toggleFavorite(id: number, event: Event) {
    event.stopPropagation(); // impede clique no coração de navegar
    this.favoriteService.toggleFavorite(id);
  }
}
