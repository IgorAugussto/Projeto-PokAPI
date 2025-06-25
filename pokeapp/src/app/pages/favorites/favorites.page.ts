import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { FavoriteService } from '../../services/favorite.service';
import { PokeApiService } from '../../services/poke-api.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  imports: [CommonModule, IonicModule, RouterModule],
})

export class FavoritesPage implements OnInit {
  favoritePokemons: any[] = [];

  constructor(
    private favoriteService: FavoriteService,
    private pokeApi: PokeApiService,
    private router: Router
  ) {}

  ngOnInit() {
  const favoriteIds = this.favoriteService.getFavorites();
  this.favoritePokemons = []; // Garante que esteja limpo ao carregar

  favoriteIds.forEach(id => {
    this.pokeApi.getPokemonById(id).subscribe((pokemon: any) => {
      if (pokemon?.sprites?.front_default) {
        this.favoritePokemons.push({
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.front_default,
        });
      }
    });
  });
}


  goToDetails(id: number) {
    this.router.navigate(['/details', id]);
  }
}
