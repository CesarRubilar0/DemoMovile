import { Injectable } from '@angular/core';

export interface Usuario {
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private storageKey = 'demo_pelis_user';

  constructor() {}

  // Simula registro: guarda usuario en localStorage (no seguro, solo demo)
  register(email: string, password: string): boolean {
    if (!email || !password) return false;
    // En un escenario real validaríamos fuerza de contraseña y comunicación con API
    const user = { email };
    localStorage.setItem(this.storageKey, JSON.stringify(user));
    return true;
  }

  // Simula login: acepta cualquier credenciales no vacías
  login(email: string, password: string): boolean {
    if (!email || !password) return false;
    const user = { email };
    localStorage.setItem(this.storageKey, JSON.stringify(user));
    return true;
  }

  logout() {
    localStorage.removeItem(this.storageKey);
  }

  getCurrentUser(): Usuario | null {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as Usuario;
    } catch {
      return null;
    }
  }
}
