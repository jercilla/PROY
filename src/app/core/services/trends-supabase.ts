import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { Trend, TrendsResponse } from '../models/trends.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrendsSupabase {

  // URL de la Edge Function
  private apiUrl = 'https://xgxcuirwmsyksetfujyr.supabase.co/functions/v1/personalized_trends';

  // Inicializa Supabase
  private supabase: SupabaseClient;

  // BehaviorSubject para gestionar el estado de las tendencias
  private trendsSubject = new BehaviorSubject<Trend[]>([]);
  public trends$ = this.trendsSubject.asObservable();

  // BehaviorSubject para gestionar el estado de carga
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) {
    this.supabase = createClient(
      'https://xgxcuirwmsyksetfujyr.supabase.co', // URL del proyecto
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhneGN1aXJ3bXN5a3NldGZ1anlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxNzg4MjcsImV4cCI6MjA3Nzc1NDgyN30.TybCDqxkF7hhH164HVzOOAjJJLgzf3JiG8PEFvqZIk8' // Anon/public key
    );

    // NO auto-carga - solo carga cuando se llama explícitamente desde dashboard
  }

  /**
   * Carga las tendencias desde la Edge Function de Supabase
   */
  async loadTrends(): Promise<void> {
    this.loadingSubject.next(true);

    try {
      // Obtener token de sesión del usuario autenticado
      const { data: sessionData } = await this.supabase.auth.getSession();
      const token = sessionData.session?.access_token;

      if (!token) {
        console.error('No hay sesión activa');
        this.loadingSubject.next(false);
        return;
      }

      // Headers con Authorization
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });

      // Llamada a la Edge Function usando HttpClient
      this.http.get<TrendsResponse>(this.apiUrl, { headers }).subscribe({
        next: (data) => {
          console.log('Tendencias cargadas:', data);
          this.trendsSubject.next(data.data);
          this.loadingSubject.next(false);
        },
        error: (err) => {
          console.error('Error al cargar tendencias:', err);
          this.loadingSubject.next(false);
        }
      });
    } catch (err) {
      console.error('Error inesperado:', err);
      this.loadingSubject.next(false);
    }
  }

  /**
   * Refresca las tendencias
   */
  refresh(): void {
    this.loadTrends();
  }
}
