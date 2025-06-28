import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { TeamService } from '../../services/team.service';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-teams',
  standalone: true,
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule, RouterModule, NgIf, NgFor],
})
export class TeamsPage {
teams = this.teamService.getTeams();

  constructor(private teamService: TeamService, private alertCtrl: AlertController) {}

  async addTeam() {
    const alert = await this.alertCtrl.create({
      header: 'Novo Time',
      inputs: [{ name: 'teamName', type: 'text', placeholder: 'Nome do time' }],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Criar',
          handler: (data) => {
            if (data.teamName?.trim()) {
              this.teamService.addTeam(data.teamName.trim());
            }
          },
        },
      ],
    });
    await alert.present();
  }
  openTeam(team: any) {
    console.log('Abrir time:', team);
  }
}
