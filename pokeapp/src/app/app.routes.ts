import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    canActivate: [authGuard],
  },
  {
    path: 'details/:id',
    loadComponent: () => import('./pages/details/details.page').then((m) => m.DetailsPage),
    canActivate: [authGuard],
  },
  {
    path: 'favorites',
    loadComponent: () => import('./pages/favorites/favorites.page').then((m) => m.FavoritesPage),
    canActivate: [authGuard],
  },
  {
    path: 'teams',
    loadComponent: () => import('./pages/teams/teams.page').then((m) => m.TeamsPage),
    canActivate: [authGuard],
  },
  {
    path: 'teams/:name',
    loadComponent: () => import('./pages/teams-details/teams-details.page').then( m => m.TeamDetailsPage),
    canActivate: [authGuard],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
