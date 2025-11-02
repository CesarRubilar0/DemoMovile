import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'pages/home', pathMatch: 'full' },
  {
    path: 'pages/home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'pages/login',
    loadComponent: () => import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'pages/registro',
    loadComponent: () => import('./pages/registro/registro.page').then((m) => m.RegistroPage),
  },
  {
    path: 'pages/lista-peliculas',
    loadComponent: () => import('./pages/lista-peliculas/lista-peliculas.page').then((m) => m.ListaPeliculasPage),
  },
  {
    path: 'pages/agregar-pelicula',
    loadComponent: () => import('./pages/agregar-pelicula/agregar-pelicula.page').then((m) => m.AgregarPeliculaPage),
  },
  {
    path: 'pages/editar-pelicula/:id',
    loadComponent: () => import('./pages/editar-pelicula/editar-pelicula.page').then((m) => m.EditarPeliculaPage),
  },
];
