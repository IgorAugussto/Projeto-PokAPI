import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { TeamService } from './services/team.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [IonicModule, RouterModule, NgIf, NgFor, AsyncPipe],
})
export class AppComponent {
teams$ = this.teamService.teams$;

  constructor(private teamService: TeamService) {}

  addTeamFromMenu() {
    const name = prompt('Nome do novo time:');
    if (name && name.trim()) {
      this.teamService.addTeam(name.trim());
    }
  }
}
