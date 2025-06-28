import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PokeApiService } from '../services/poke-api.service';
import { FavoriteService } from '../services/favorite.service';
import { TeamService } from '../services/team.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ActionSheetController } from '@ionic/angular';

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
    private router: Router,
    private actionSheetCtrl: ActionSheetController
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

  isInAnyTeam(id: number): boolean {
    return this.teamService.isInAnyTeam(id);
  }

  isInTeam(pokemonId: number): boolean {
  return this.teamService.isInAnyTeam(pokemonId);
}

async selectTeam(pokemonId: number, event: Event) {
  event.stopPropagation();
  const actionSheet = await this.actionSheetCtrl.create({
    header: 'Adicionar ao Time',
    buttons: this.teamService.getTeams().map(team => ({
      text: team.name,
      handler: () => {
        this.teamService.addPokemonToTeam(team.name, pokemonId);
      }
    }))
  });
  await actionSheet.present();
}

}
