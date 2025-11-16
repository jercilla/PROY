import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { BehaviorSubject, Observable } from 'rxjs';

export interface HistoryItem {
  id: string;           // UUID
  user_id: string;      // UUID del usuario
  trend_id: string;     // UUID del trend relacionado
  text: string;         // texto generado
  length: number;       // longitud del texto (entre 120 y 1024)
  tone: 'formal' | 'informal'; // enum que definiste en PostgreSQL
  emojis: boolean;      // si se usan emojis
  hashtag: boolean;     // si se usan hashtags
  created_at: string;   // timestamp en formato ISO
}

@Injectable({
  providedIn: 'root'
})
export class HistorySupabase {

  private supabase: SupabaseClient;

  private historySubject = new BehaviorSubject<HistoryItem[]>([]);
  public history$ = this.historySubject.asObservable();


  constructor() {
    this.supabase = createClient(
      'https://xgxcuirwmsyksetfujyr.supabase.co', // URL del proyecto
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhneGN1aXJ3bXN5a3NldGZ1anlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxNzg4MjcsImV4cCI6MjA3Nzc1NDgyN30.TybCDqxkF7hhH164HVzOOAjJJLgzf3JiG8PEFvqZIk8'                      // Anon/public key
    );

    this.leer();
  }

  async guardar(entry: {
    trend_id: string;
    text: string;
    length: number;
    tone: string;
    emojis: boolean;
    hashtag: boolean;
  }) {
    const { data, error } = await this.supabase
      .from('history')
      .insert([ entry ]);

    // Refrescamos la tabla después de guardar
    await this.leer();

    return { data, error: null };
  }

  async leer() : Promise<void>{
    
    const { data, error } = await this.supabase
      .from<'history', HistoryItem>('history')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error leyendo tabla:', error);
      return;
    }

    console.log('Historial actualizado:', data);

    // Actualiza el observable
    this.historySubject.next(data || []);
  }


}