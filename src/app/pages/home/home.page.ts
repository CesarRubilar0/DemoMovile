import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButtons,
} from '@ionic/angular/standalone';
import { ToastController } from '@ionic/angular';
import { PeliculaService } from '../../services/pelicula.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
  CommonModule,
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButtons,
  ],
})
export class HomePage {
  constructor(private router: Router, private peliculaService: PeliculaService, private toastCtrl: ToastController) {}

  goToList() {
    this.router.navigateByUrl('/pages/lista-peliculas');
  }

  async resetSeed() {
    this.peliculaService.resetSeed();
    const t = await this.toastCtrl.create({ message: 'Seed restaurado: 30 películas cargadas', duration: 1500, color: 'success' });
    await t.present();
    this.router.navigateByUrl('/pages/lista-peliculas');
  }
}
