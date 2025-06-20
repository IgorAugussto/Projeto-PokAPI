import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  getPokemons(limit = 20, offset = 0) {
    return this.http
      .get<any>(`${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`)
      .pipe(
        map((response) => {
          return response.results.map((pokemon: any, index: number) => {
            const id = offset + index + 1;
            return {
              name: pokemon.name,
              image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
              id,
            };
          });
        })
      );
  }

  getPokemonById(id: number) {
    return this.http.get(`${this.baseUrl}/pokemon/${id}`);
  }
}
