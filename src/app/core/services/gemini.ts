import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class Gemini {

  // URL de tu función Supabase
  private apiUrl = 'https://xgxcuirwmsyksetfujyr.supabase.co/functions/v1/gemini-request';

  // Inicializa Supabase
  private supabase: SupabaseClient;

  constructor(private http: HttpClient) {
    this.supabase = createClient(
      'https://xgxcuirwmsyksetfujyr.supabase.co', // URL del proyecto
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhneGN1aXJ3bXN5a3NldGZ1anlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxNzg4MjcsImV4cCI6MjA3Nzc1NDgyN30.TybCDqxkF7hhH164HVzOOAjJJLgzf3JiG8PEFvqZIk8'                      // Anon/public key
    );
  }

  generateContent(prompt: string): Observable<any> {
    // Obtenemos el token del usuario logueado
    return new Observable((observer) => {
      this.supabase.auth.getSession().then(({ data }) => {
        const token = data.session?.access_token;

        if (!token) {
          observer.error('No hay sesión activa. Debes iniciar sesión.');
          return;
        }

        // Headers con Content-Type y Authorization
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        });

        // Llamada a la función Supabase
        console.log('Prompt: servicio', {prompt})
        this.http.post(this.apiUrl, { prompt }, { headers })
          .pipe(
            catchError((err) => {
              console.error('Error en GeminiService:', err);
              return throwError(() => err);
            })
          )
          .subscribe({
            next: (res) => observer.next(res),
            error: (err) => observer.error(err),
            complete: () => observer.complete()
          });
      }).catch(err => {
        observer.error('Error al obtener la sesión: ' + err);
      });
    });
  }

}