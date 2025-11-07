import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor() {
    // Verificar si hay una sesión guardada en localStorage
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth === 'true') {
      this.isAuthenticatedSubject.next(true);
    }
  }

  login(email: string, password: string): Promise<boolean> {
    // Mock: Por ahora aceptamos cualquier credencial
    return new Promise((resolve) => {
      setTimeout(() => {
        this.isAuthenticatedSubject.next(true);
        localStorage.setItem('isAuthenticated', 'true');
        resolve(true);
      }, 1000);
    });
  }

  logout(): void {
    this.isAuthenticatedSubject.next(false);
    localStorage.removeItem('isAuthenticated');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
