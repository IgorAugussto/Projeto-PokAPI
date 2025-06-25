import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-teams',
  standalone: true,
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule],
})
export class TeamsPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
