import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PokeApiService } from '../services/poke-api.service';
import { FavoriteService } from '../services/favorite.service';
import { TeamService } from '../services/team.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, ReactiveFormsModule],
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
    private teamService: TeamService,
    private router: Router
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

  toggleFavorite(id: number, event: Event): void {
    event.stopPropagation();
    this.favoriteService.toggleFavorite(id);
  }

  isInTeam(id: number): boolean {
    return this.teamService.isInTeam(id);
  }

  toggleTeam(id: number, event: Event): void {
    event.stopPropagation();
    this.teamService.toggleTeam(id);
  }

  selectTeam(pokemonId: number, event?: Event) {
  if (event) event.stopPropagation(); // evita abrir o card por clique acidental
  this.teamService.toggleTeam(pokemonId);
}

}
