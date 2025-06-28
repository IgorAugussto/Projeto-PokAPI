import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController, NavController } from '@ionic/angular';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TeamService } from '../../services/team.service';
import { PokeApiService } from '../../services/poke-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-details',
  standalone: true,
  templateUrl: './teams-details.page.html',
  styleUrls: ['./teams-details.page.scss'],
  imports: [CommonModule, IonicModule, RouterModule],
})
export class TeamDetailsPage implements OnInit {
  teamName: string = '';
  pokemons: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService,
    private pokeApi: PokeApiService,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private router: Router
  ) {}

  goToDetails(id: number) {
    this.router.navigate(['/details', id]);
  }

  ngOnInit() {
    this.teamName = this.route.snapshot.paramMap.get('name') || '';
    const pokemonIds = this.teamService.getPokemonsOfTeam(this.teamName);
    this.pokemons = [];

    pokemonIds.forEach((id) => {
      this.pokeApi.getPokemonById(id).subscribe((pokemon: any) => {
        if (pokemon?.sprites?.front_default) {
          this.pokemons.push({
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.sprites.front_default,
          });
        }
      });
    });
  }

  async deleteTeam() {
    const alert = await this.alertCtrl.create({
      header: 'Excluir Time',
      message: `Tem certeza que deseja excluir o time "${this.teamName}"?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Excluir',
          role: 'destructive',
          handler: () => {
            this.teamService.deleteTeam(this.teamName);
            this.navCtrl.navigateRoot('/teams');
          },
        },
      ],
    });

    await alert.present();
  }
}
