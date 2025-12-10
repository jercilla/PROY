import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { UserSettings, ToneLabel } from '../../core/models/user-settings.model';
import { UserSettingsRepository } from 'src/app/core/services/repositories/user-settings';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class SettingsPage implements OnInit {

  // Definimos variables para los campos de configuración
  length: number = 100;
  tonePercentage: number = 0;
  tone : ToneLabel = "Muy Informal";
  hashtags: boolean = false;
  emojis: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userSettingsRepository : UserSettingsRepository,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    // Leemos la configuración del usuario
    this.userSettingsRepository.userSettings$.subscribe(settings => {
      this.length = settings!.length || 120;
      this.tone = settings!.tone || "Muy informal";
      this.getTonePercentage();
      this.hashtags = settings!.hashtags ?? true;
      this.emojis = settings!.emojis ?? true;
      console.log('Configuración del usuario aplicada:', settings);
    });
  }

  // Obtener el porcentaje del tono según la etiqueta
  getTonePercentage(): number {
    if( this.tone === 'Muy Informal') return this.tonePercentage = 0;
    if( this.tone === 'Informal') return this.tonePercentage = 1;
    if( this.tone === 'Formal') return this.tonePercentage = 2;
    return this.tonePercentage = 3;
  }

  // Obtener label del tono basado en el valor
  getToneLabel(): ToneLabel {
    if (this.tonePercentage == 0) return 'Muy Informal';
    if (this.tonePercentage == 1) return 'Informal';
    if (this.tonePercentage == 2) return 'Formal';
    return 'Muy Formal';
  }

  // Guardar cambios
  saveSettings(): void{

    // Leer el tono
    this.tone = this.getToneLabel();

    // Crear objeto con la configuración actualizada
    const updatedSettings : UserSettings = {
      length: this.length,
      tone: this.tone,
      hashtags: this.hashtags,
      emojis: this.emojis,
    };

    try { // Persitir la configuración usando el repositorio
      this.userSettingsRepository.update(updatedSettings);
      console.log('Configuración guardada:', updatedSettings);
    } catch (error) { // Avisar si hay error
      console.error('Error durante el guardado de la configuración:', error);
    }

  }

  // Formatter para el pin del range de longitud
  pinFormatter(value: number): string {
    return `${value} car.`;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  changePassword() {
    this.router.navigate(['/reset-password'], {
      queryParams: { returnTo: 'settings' }
    });
  }




}
