import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseRepository } from './repositories/supabase';

@Injectable({
  providedIn: 'root'
})
export class Gemini {

  // URL de tu función Supabase
  private apiUrl = 'https://xgxcuirwmsyksetfujyr.supabase.co/functions/v1/gemini-request';

  // Inicializa Supabase
  private supabase: SupabaseClient;

  constructor(private http: HttpClient, private supa: SupabaseRepository) {
    this.supabase = this.supa.client;
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