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
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonLabel, IonButton],
})
export class RegistroPage {
  registroForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  constructor(private auth: AuthService, private router: Router, private toastCtrl: ToastController) {}

  passwordsMatch(): boolean {
    const p = this.registroForm.get('password')?.value;
    const c = this.registroForm.get('confirmPassword')?.value;
    return p != null && c != null && p === c;
  }

  async onSubmit() {
    if (this.registroForm.invalid || !this.passwordsMatch()) {
      const toast = await this.toastCtrl.create({ message: 'Corrige los errores del formulario.', duration: 2000, color: 'danger' });
      await toast.present();
      return;
    }
    const { email, password } = this.registroForm.value as any;
    const ok = this.auth.register(email, password);
    const toast = await this.toastCtrl.create({ message: ok ? 'Registro exitoso' : 'No fue posible registrar', duration: 2000, color: ok ? 'success' : 'danger' });
    await toast.present();
    if (ok) this.router.navigateByUrl('/pages/login');
  }
}
