import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PokeApiService } from '../services/poke-api.service';
import { RouterModule } from '@angular/router';

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

  constructor(private pokeApi: PokeApiService) {}

  ionViewDidEnter() {
    this.loadMorePokemons();
  }

  loadMorePokemons() {
    this.loading = true;
    this.pokeApi.getPokemons(this.limit, this.offset).subscribe((data) => {
      this.pokemons.push(...data); // adiciona os novos pokémons
      this.offset += this.limit;
      this.loading = false;
    });
  }
}
