import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
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
    private userSettingsRepository : UserSettingsRepository
  ) { }

  ngOnInit() {
    // Leemos la configuración del usuario
    this.userSettingsRepository.userSettings$.subscribe(settings => {
      this.length = settings!.length || 120;
      this.tone = settings!.tone || "Muy informal";
      this.hashtags = settings!.hashtags || true;
      this.emojis = settings!.emojis || true;
      console.log('Configuración del usuario aplicada:', settings);
    });
  }

  // Obtener label del tono basado en el valor
  getToneLabel(): ToneLabel {
    if (this.tonePercentage < 25) return 'Muy Informal';
    if (this.tonePercentage < 50) return 'Informal';
    if (this.tonePercentage < 75) return 'Formal';
    return 'Muy Formal';
  }

  // Guardar cambios
  saveSettings() {

    // Leer el tono
    this.tone = this.getToneLabel();

    // Crear objeto con la configuración actualizada
    const updatedSettings : UserSettings = {
      length: this.length,
      tone: this.tone,
      hashtags: this.hashtags,
      emojis: this.emojis,
    };

    // Persitir la configuración usando el repositorio
    this.userSettingsRepository.update(updatedSettings);

    console.log('Configuración guardada:', updatedSettings);
  }

  // Formatter para el pin del range de longitud
  pinFormatter(value: number): string {
    return `${value} car.`;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
