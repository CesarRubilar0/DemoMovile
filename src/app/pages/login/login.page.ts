import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonButtons,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
  CommonModule,
  RouterModule,
    ReactiveFormsModule,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  ],
})
export class LoginPage {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private auth: AuthService, private router: Router, private toastCtrl: ToastController) {}

  async onSubmit() {
    if (this.loginForm.invalid) {
      const toast = await this.toastCtrl.create({ message: 'Corrige los errores del formulario.', duration: 2000, color: 'danger' });
      await toast.present();
      return;
    }
    const { email, password } = this.loginForm.value as { email: string; password: string };
    const ok = this.auth.login(email, password);
    const toast = await this.toastCtrl.create({ message: ok ? 'Login exitoso' : 'Credenciales inválidas', duration: 2000, color: ok ? 'success' : 'danger' });
    await toast.present();
    if (ok) this.router.navigateByUrl('/pages/lista-peliculas');
  }
}
