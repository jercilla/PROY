import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class HistorySupabase {

  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://xgxcuirwmsyksetfujyr.supabase.co', // URL del proyecto
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhneGN1aXJ3bXN5a3NldGZ1anlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxNzg4MjcsImV4cCI6MjA3Nzc1NDgyN30.TybCDqxkF7hhH164HVzOOAjJJLgzf3JiG8PEFvqZIk8'                      // Anon/public key
    );
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

    return { data, error };
  }

}