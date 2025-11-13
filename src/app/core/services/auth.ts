import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { createClient, SupabaseClient, AuthSession } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Definimos el cliente Supabase:
  private supabase: SupabaseClient;

  // Definimos observable para el estado de autenticación
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor() {
    // Inicializamos el cliente Supabase usando las variables de entorno
    this.supabase = createClient(
      environment.supabase.url,
      environment.supabase.anon_key
    );

    // Comprobamos la sesión inicial al cargar la aplicación
    this.checkInitialAuthStatus();

    // Nos suscribimos a los cambios de estado de autenticación de Supabase (login, logout, token refresh)
    this.supabase.auth.onAuthStateChange((event, session) => {
      console.log(`Supabase Auth Event: ${event}`);
      this.updateAuthStatus(session);
    });
  }

  // Verificamos el estado de autenticación inicial
  private async checkInitialAuthStatus(): Promise<void> {
    const { data: { session } } = await this.supabase.auth.getSession();
    this.updateAuthStatus(session);
  }

  // Actualizamos el estado de autenticación
  private updateAuthStatus(session: AuthSession | null): void {
    const isAuthenticated = !!session;
    if (this.isAuthenticatedSubject.value !== isAuthenticated) {
        this.isAuthenticatedSubject.next(isAuthenticated);
    }
  }

  // Vertificamos si el usuario está autenticado
  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  // Gestionamos el inicio de sesión
  async login(email: string, password: string): Promise<boolean> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Error durante el acceso:', error.message);
      return false;
    }

    return !!data.session;
  }

  // Gestionamos el registro
  async signup(email: string, password: string): Promise<boolean> {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error('Error durante el registro:', error.message);
      throw error;
    }

    return !!data.user;
  }

  // Gestionamos el cierre de sesión
  async logout(): Promise<void> {
    const { error } = await this.supabase.auth.signOut();

    if (error) {
      console.error('Error durante la desconexión:', error.message);
    }
  }
}
