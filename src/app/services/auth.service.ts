import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Subject para manejar el estado de autenticación
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  // Credenciales de prueba
  private readonly ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
  };

  constructor() {}

  // Verifica si existe token en localStorage
  private hasToken(): boolean {
    return !!localStorage.getItem('admin_token');
  }

  // Inicia sesión
  login(username: string, password: string): boolean {
    if (username === this.ADMIN_CREDENTIALS.username &&
        password === this.ADMIN_CREDENTIALS.password) {
      localStorage.setItem('admin_token', 'fake-jwt-token');
      this.isAuthenticatedSubject.next(true);
      return true;
    }
    return false;
  }

  // Cierra sesión
  logout(): void {
    localStorage.removeItem('admin_token');
    this.isAuthenticatedSubject.next(false);
  }

  // Verifica si está autenticado
  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
