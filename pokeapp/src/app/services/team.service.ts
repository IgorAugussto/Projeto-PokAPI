import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TeamService {
  private storageKey = 'pokemonTeam';

  getTeam(): number[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  isInTeam(id: number): boolean {
    return this.getTeam().includes(id);
  }

  toggleTeam(id: number): void {
    const team = this.getTeam();

    if (team.includes(id)) {
      // Remover do time
      const updatedTeam = team.filter(pokeId => pokeId !== id);
      localStorage.setItem(this.storageKey, JSON.stringify(updatedTeam));
    } else {
      if (team.length >= 6) {
        alert('Você só pode ter até 6 Pokémons no time!');
        return;
      }

      team.push(id);
      localStorage.setItem(this.storageKey, JSON.stringify(team));

      // Aqui você pode disparar o webhook se o time estiver completo:
      if (team.length === 6) {
        this.sendWebhook(team);
      }
    }
  }

  sendWebhook(team: number[]) {
    // Aqui você poderia usar HttpClient para enviar os dados para um endpoint externo
    // Exemplo: this.http.post('https://seu-webhook.com', { team })
    console.log('Webhook acionado! Time completo:', team);
  }
}
