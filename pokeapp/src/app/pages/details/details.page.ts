import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PokeApiService } from '../../services/poke-api.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  pokemonId: number = 0;
  pokemon: any = null;
  types: string = '';
  abilities: string = '';

  constructor(private route: ActivatedRoute, private pokeApi: PokeApiService) {}

  ngOnInit() {
    this.pokemonId = Number(this.route.snapshot.paramMap.get('id'));
    this.pokeApi.getPokemonById(this.pokemonId).subscribe((data:any) => {
      this.pokemon = data;
      this.types = data.types.map((t: any) => t.type.name).join(', ');
      this.abilities = data.abilities
        .map((a: any) => a.ability.name)
        .join(', ');
    });
  }
}
