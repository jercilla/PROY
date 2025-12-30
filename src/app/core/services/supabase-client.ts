import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class SupabaseClientService {
  public readonly client: SupabaseClient;

  constructor() {
    const url = environment.supabase.url;
    const key = environment.supabase.anon_key;

    if (!url || !key) {
      throw new Error('Supabase env vars missing: url / anon_key');
    }

    this.client = createClient(url, key);
  }
}