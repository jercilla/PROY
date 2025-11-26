import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Gemini } from 'src/app/core/services/gemini';
import { HttpClientModule } from '@angular/common/http';
import { UserSettingsRepository } from 'src/app/core/services/repositories/user-settings';
import { HistoryRepository } from 'src/app/core/services/repositories/history';
import { Trend } from 'src/app/core/models/trends.model';
import { CreateHistoryItemDto } from 'src/app/core/models/history.model';


@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, HttpClientModule],
  providers: [Gemini]
})
export class NewPage implements OnInit {

  // Definimos variable para la tendencia
  trend: Trend | null = null;

  // Definimos variables para los campos de configuración
  length: number = 100;
  tonePercentage: number = 0;
  tone : string = "Muy Informal";
  hashtags: boolean = false;
  emojis: boolean = false;

  // Getter dinámico para el prompt
  get prompt(): string {
    return `Redacta un tuit sobre "${this.trend?.trend_name}" con las siguientes indicaciones:
- Longitud: ${this.length} caracteres.
- Tono: ${this.getTonLabel()}.
- Hashtags: ${this.hashtags ? "sí, incluir hashtags relevantes de forma natural." : "no incluir hashtags."}
- Emojis: ${this.emojis ? "sí, usar emojis apropiados de manera natural." : "no usar emojis."}
El tuit debe ser claro, informativo y llamativo para la audiencia.`;
  }
 

  // Resultado
  resultado: string = '';
  mostrarResultado: boolean = false;
  modoEdicion: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastController: ToastController,
    private gemini : Gemini,
    private historyRepository : HistoryRepository,
    private userSettingsRepository : UserSettingsRepository
  ) { }

  ngOnInit() {
    // Leemos el trend si existe
    this.route.queryParams.subscribe(params => {
      // Si existe deserializamos y asignamos
      const trendJson = params['trend'];
      if (trendJson) {
        try {
          this.trend = JSON.parse(trendJson) as Trend;
          } catch (e) {
          console.error('Error al parsear el JSON de la tendencia:', e);
          this.router.navigate(['/dashboard']);
          return; 
        }
      }
    });
    
    // Leemos la configuración del usuario
    this.userSettingsRepository.userSettings$.subscribe(settings => {
      this.length = settings!.length || 120;
      this.tone = settings!.tone || "Muy informal";
      this.hashtags = settings!.hashtags || true;
      this.emojis = settings!.emojis || true;
      console.log('Configuración del usuario aplicada:', settings);
    });
  }

  // Formatter para el pin del range de longitud
  pinFormatter(value: number): string {
    return `${value} car.`;
  }

  // Obtener label del tono basado en el valor
  getTonLabel(): string {
    if (this.tonePercentage < 25) return 'Muy Informal';
    if (this.tonePercentage < 50) return 'Informal';
    if (this.tonePercentage < 75) return 'Formal';
    return 'Muy Formal';
  }

  generar() {

    this.gemini.generateContent(this.prompt).subscribe({
      next: (res) => {
        this.resultado = res.reply;
        this.mostrarResultado = true;
        this.modoEdicion = false;
        this.showToast('Texto generado exitosamente', 'success');
      },
      error: (err) => {
        console.error('Error:', err);
        this.resultado = 'Ocurrió un error al generar el contenido.';
      }
    });

    // Simular generación de texto con IA
    console.log('Generando texto con parámetros:', {
      length: this.length,
      tono: this.tone,
      hashtag: this.hashtags,
      emoji: this.emojis,
      resultado : this.resultado
    });

  }

  editar() {
    this.modoEdicion = true;
    console.log('Modo edición activado');
    this.showToast('Ahora puedes editar el texto', 'primary');
  }

  async copiar() {
    try {
      await navigator.clipboard.writeText(this.resultado);
      console.log('Texto copiado al portapapeles');
      this.showToast('Texto copiado al portapapeles', 'success');
    } catch (error) {
      console.error('Error al copiar:', error);
      this.showToast('Error al copiar el texto', 'danger');
    }
  }

  async guardar() {

    const historyItem : CreateHistoryItemDto = {
      trend_id: this.trend!.id,
      text: this.resultado,
      length: this.length,
      tone: this.getTonLabel(),
      emojis: this.emojis,
      hashtag: this.hashtags
    };

    const { data, error } = await this.historyRepository.create(historyItem);

    if (error) {
      console.error('Error al guardar:', error);
      return;
    }

    console.log('Guardando en historial:', this.resultado);
    this.showToast('Guardado en historial', 'success');

    // Opcional: navegar al historial después de guardar
    // setTimeout(() => {
    //   this.router.navigate(['/history']);
    // }, 1500);
  }

  /**
   * Mostrar toast tipo “card moderno”
   * color: 'success' | 'warning' | 'danger'
   */
  async showToast(message: string, color: string) {
    const iconMap: Record<string, string> = {
      success: 'checkmark-circle-outline',
      warning: 'alert-circle-outline',
      danger: 'close-circle-outline'
    };

    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
      color,
      icon: iconMap[color] || undefined,
      cssClass: 'toast-card' // Clase personalizada para estilo moderno
    });

    await toast.present();
  }
}
