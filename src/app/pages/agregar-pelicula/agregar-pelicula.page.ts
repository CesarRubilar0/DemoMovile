import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PeliculaService } from '../../services/pelicula.service';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-agregar-pelicula',
  templateUrl: './agregar-pelicula.page.html',
  styleUrls: ['./agregar-pelicula.page.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton],
})
export class AgregarPeliculaPage {
  peliculaForm = new FormGroup({
    titulo: new FormControl('', [Validators.required]),
    descripcion: new FormControl(''),
    // removido: imagen ya no es parte del formulario; se genera automáticamente al crear la película
    año: new FormControl('', [Validators.pattern('^[0-9]{4}$')]),
    genero: new FormControl(''),
    puntuacion: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(5)]),
  });

  constructor(private peliculaService: PeliculaService, private router: Router, private toastCtrl: ToastController) {}

  async onSubmit() {
    if (this.peliculaForm.invalid) {
      const toast = await this.toastCtrl.create({ message: 'Revisa los campos requeridos', duration: 1500, color: 'danger' });
      await toast.present();
      return;
    }
    const value = this.peliculaForm.value as any;
  // generamos una imagen placeholder local como data-URI SVG que muestra el título
  const generatedImage = this.placeholderDataUri(value.titulo, 256, 150);
    const payload = {
      titulo: value.titulo,
      descripcion: value.descripcion,
      puntuacion: Number(value.puntuacion),
      imagen: generatedImage,
    };
    const nueva = this.peliculaService.addPelicula(payload as any);
    const toast = await this.toastCtrl.create({ message: `Película "${nueva.titulo}" agregada`, duration: 1500, color: 'success' });
    await toast.present();
    this.router.navigateByUrl('/pages/lista-peliculas');
  }

  // no hay preview porque no hay campo imagen en el formulario

  private placeholderDataUri(title: string, width = 256, height = 150, bg = '#E0D2FF', fg = '#2b2b2b') {
    const safe = (title || '?').toString()
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
    const fontSize = Math.max(12, Math.min(36, Math.floor(width / Math.max(6, safe.length))));
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'>` +
      `<rect width='100%' height='100%' fill='${bg}'/>` +
      `<text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='${fg}' font-family='Arial, Helvetica, sans-serif' font-size='${fontSize}px'>${safe}</text>` +
      `</svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }
}
