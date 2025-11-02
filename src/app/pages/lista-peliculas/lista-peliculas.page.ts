import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { PeliculaService, Pelicula } from '../../services/pelicula.service';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonButtons,
  IonButton,
  IonSearchbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from '@ionic/angular/standalone';
import { AlertController, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-peliculas',
  templateUrl: './lista-peliculas.page.html',
  styleUrls: ['./lista-peliculas.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonButtons, IonButton, IonSearchbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent],
})
export class ListaPeliculasPage implements OnInit, OnDestroy {
  peliculas: Pelicula[] = [];
  filtered: Pelicula[] = [];
  searchTerm = '';
  sub: Subscription | undefined;

  // helpers para mostrar estrellas
  stars(n: number) {
    return Array.from({ length: Math.max(0, Math.floor(n)) });
  }

  emptyStars(n: number) {
    const filled = Math.max(0, Math.floor(n));
    return Array.from({ length: Math.max(0, 5 - filled) });
  }

  constructor(
    private peliculaService: PeliculaService,
    private router: Router,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  // Genera un data-URI SVG placeholder que muestra el título dentro de la imagen.
  getPlaceholderImage(title?: string, width = 120, height = 80) {
    const safe = (title || '?').toString()
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
    const fontSize = Math.max(10, Math.min(20, Math.floor(width / Math.max(6, safe.length))));
    const bg = '#E0D2FF';
    const fg = '#2b2b2b';
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'>` +
      `<rect width='100%' height='100%' fill='${bg}'/>` +
      `<text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='${fg}' font-family='Arial, Helvetica, sans-serif' font-size='${fontSize}px'>${safe}</text>` +
      `</svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  ngOnInit() {
    this.sub = this.peliculaService.getPeliculas$().subscribe((list) => {
      this.peliculas = list || [];
      this.applyFilter();
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  applyFilter() {
    const q = (this.searchTerm || '').toLowerCase().trim();
    if (!q) {
      this.filtered = [...this.peliculas];
      return;
    }
    this.filtered = this.peliculas.filter((p) => {
      const t = p.titulo?.toLowerCase() || '';
      const d = p.descripcion?.toLowerCase() || '';
      const g = (p as any).genero?.toLowerCase() || '';
      return t.includes(q) || d.includes(q) || g.includes(q);
    });
  }

  onSearchChange(ev: any) {
    // works with ion-searchbar event or direct value
    this.searchTerm = ev?.detail?.value ?? ev ?? '';
    this.applyFilter();
  }

  goToAgregar() {
    this.router.navigateByUrl('/pages/agregar-pelicula');
  }

  goToEditar(id: number) {
    this.router.navigateByUrl(`/pages/editar-pelicula/${id}`);
  }

  async confirmarYEliminar(id: number) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar',
      message: '¿Seguro que deseas eliminar esta película?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: async () => {
            this.peliculaService.deletePelicula(id);
            const toast = await this.toastCtrl.create({ message: 'Película eliminada', duration: 1500, color: 'success' });
            await toast.present();
          },
        },
      ],
    });
    await alert.present();
  }
}
