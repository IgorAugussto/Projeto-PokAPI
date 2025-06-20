import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PokeApiService } from '../services/poke-api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  pokemons: any[] = [];

  constructor(private pokeApi: PokeApiService) {}

  ionViewDidEnter() {
    this.pokeApi.getPokemons().subscribe((data) => {
      this.pokemons = data;
    });
  }
}
