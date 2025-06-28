// team.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Team {
  name: string;
  pokemons: number[];
}

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private teamsSubject = new BehaviorSubject<Team[]>([]);
  teams$ = this.teamsSubject.asObservable();

  constructor() {
    const saved = localStorage.getItem('teams');
    if (saved) {
      this.teamsSubject.next(JSON.parse(saved));
    }
  }

  getTeams(): Team[] {
    return this.teamsSubject.getValue();
  }

  addTeam(name: string) {
    const updated = [...this.getTeams(), { name, pokemons: [] }];
    this.teamsSubject.next(updated);
    this.save(updated);
  }

  addPokemonToTeam(teamName: string, pokemonId: number) {
    const updated = this.getTeams().map(t => {
      if (t.name === teamName && !t.pokemons.includes(pokemonId)) {
        return { ...t, pokemons: [...t.pokemons, pokemonId] };
      }
      return t;
    });
    this.teamsSubject.next(updated);
    this.save(updated);
  }

  getPokemonsOfTeam(teamName: string): number[] {
    const team = this.getTeams().find(t => t.name === teamName);
    return team ? team.pokemons : [];
  }

  isInAnyTeam(pokemonId: number): boolean {
    return this.getTeams().some(t => t.pokemons.includes(pokemonId));
  }

  deleteTeam(name: string) {
    const updated = this.getTeams().filter(t => t.name !== name);
    this.teamsSubject.next(updated);
    this.save(updated);
  }

  private save(teams: Team[]) {
    localStorage.setItem('teams', JSON.stringify(teams));
  }
}
