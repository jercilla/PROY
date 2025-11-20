import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { BehaviorSubject, Observable } from 'rxjs';
import type { History } from 'src/app/core/models/history.model';

@Injectable({
  providedIn: 'root'
})
export class HistorySupabase {

  private supabase: SupabaseClient;

  private historySubject = new BehaviorSubject<History[]>([]);
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
      .from<'history', History>('history')
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