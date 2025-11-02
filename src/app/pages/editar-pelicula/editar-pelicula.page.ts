import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-editar-pelicula',
  templateUrl: './editar-pelicula.page.html',
  styleUrls: ['./editar-pelicula.page.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton],
})
export class EditarPeliculaPage implements OnInit {
  peliculaForm = new FormGroup({
    titulo: new FormControl('', [Validators.required]),
    descripcion: new FormControl(''),
    puntuacion: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(5)]),
  });
  id = 0;

  constructor(private route: ActivatedRoute, private router: Router, private peliculaService: PeliculaService, private toastCtrl: ToastController) {}

  ngOnInit(): void {
    const idStr = this.route.snapshot.paramMap.get('id');
    if (idStr) {
      this.id = Number(idStr);
      const p = this.peliculaService.getPeliculaById(this.id);
      if (p) {
        this.peliculaForm.patchValue({ titulo: p.titulo, descripcion: p.descripcion, puntuacion: p.puntuacion });
      }
    }
  }

  async onSubmit() {
    if (this.peliculaForm.invalid) {
      const toast = await this.toastCtrl.create({ message: 'Revisa el formulario', duration: 1500, color: 'danger' });
      await toast.present();
      return;
    }
    this.peliculaService.updatePelicula(this.id, this.peliculaForm.value as any);
    const toast = await this.toastCtrl.create({ message: 'Película actualizada', duration: 1500, color: 'success' });
    await toast.present();
    this.router.navigateByUrl('/pages/lista-peliculas');
  }
}
