import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment'; // Importa el archivo de entorno

@Injectable({
  providedIn: 'root'
})
export class SupabaseRepository {
  
  // Cliente de Supabase que será usado por las clases hijas
  protected client: SupabaseClient;

  constructor() {
    
    // Lectura de las variables de entorno
    const supabaseUrl = environment.supabase.url;
    const supabaseAnonKey = environment.supabase.anon_key;
    
    // Verificación de variables
    if (!supabaseUrl || !supabaseAnonKey) {
        console.error('ERROR: Supabase URL o Anon Key no están definidas en environment.ts. No se pudo inicializar el cliente Supabase.');
        // Inicialización vacía para evitar errores posteriores
        this.client = {} as SupabaseClient; 
    } else {
        // Inicialización del cliente
        this.client = createClient(
          supabaseUrl, 
          supabaseAnonKey
        );
        console.log('Cliente de Supabase inicializado correctamente');
    }
  }
  
}