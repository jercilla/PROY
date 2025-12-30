import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { HistoryItem } from '../models/history.model';
import { SupabaseClientService } from './supabase-client';

@Injectable({
  providedIn: 'root'
})
export class HistorySupabase {

  private supabase: SupabaseClient;

  private historySubject = new BehaviorSubject<HistoryItem[]>([]);
  public history$ = this.historySubject.asObservable();


  constructor(private supa: SupabaseClientService) {
    this.supabase = this.supa.client;
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

    return { data, error };
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