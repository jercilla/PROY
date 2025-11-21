import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SupabaseRepository } from './supabase';
import { UserSettings } from '../../models/user-settings.model';

@Injectable({
  providedIn: 'root',
})
export class UserSettingsRepository extends SupabaseRepository{

  // Configuración por defecto
  defaultUserSettings : UserSettings = {
    length: 120,
    tone: "Muy Informal",
    emojis: true,
    hashtags: true,
  };

  // BehaviorSubject para gestionar el estado de la configuracion
  private userSettingsSubject = new BehaviorSubject<UserSettings | null>(null);
  public userSettings$ = this.userSettingsSubject.asObservable();

  constructor() {
    // Invocamos el constructor del padre donde se establece el cliente Supabase
    super();
    // Leemos la configuración
    this.get();
  }

  async get() : Promise<void>{
    
    // Obtener el usuario autenticado
    const user = await this.client.auth.getUser();

    // Avisar si no hay usuario
    if (!user.data.user) {
        console.warn('Usuario no autenticado. No se puede cargar la configuración.');
        this.userSettingsSubject.next(null);
        return;
    }

    // Guarda el ID de usuario en una variable
    const userId = user.data.user.id;
    
    // Se obtiene una línea, que por políticas será la del propio usuario
    const { data, error } = await this.client
      .from('user_settings')
      .select<string, UserSettings>('*')
      .eq('id', userId) 
      .single();

    // Avisa si no existe y devuelve configuración por defecto
    if (error && error.code !== 'PGRST116') {
      console.error('Error al leer la configuración:', error);
      this.userSettingsSubject.next(this.defaultUserSettings);
      return;
    }

    // Si no hay error y hay datos, actualiza el observable
    if (data) {
        console.log('Configuración de usuario cargada:', data);
        this.userSettingsSubject.next(data);
    } else {
        // Si no se encuentra se devuelve la configuración por defecto
        console.log('No se encontró configuración, usando valor por defecto');
        this.userSettingsSubject.next(this.defaultUserSettings); 
    }
  }
  
}
