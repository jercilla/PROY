import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SupabaseRepository } from './supabase';
import { HistoryItem } from '../../models/history.model';

@Injectable({
  providedIn: 'root',
})
export class HistoryRepository extends SupabaseRepository{

  // BehaviorSubject para gestionar el estado del historial
  private historySubject = new BehaviorSubject<HistoryItem[]>([]);
  public history$ = this.historySubject.asObservable();

  constructor() {
    // Invocamos el constructor del padre donde se establece el cliente Supabase
    super();
    // Leemos el historial al inicializar el servicio
    this.getAll();
  }

  async create(entry: {
    trend_id: string;
    text: string;
    length: number;
    tone: string;
    emojis: boolean;
    hashtag: boolean;
  }) {
    const { data, error } = await this.client
      .from('history')
      .insert([ entry ]);

    // Refrescamos la tabla después de guardar
    await this.getAll();

    return { data, error: null };
  }

  async getAll() : Promise<void>{
    
    const { data, error } = await this.client
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

