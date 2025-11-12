import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class NewPage implements OnInit {
  // Datos de la tendencia
  trendTitle: string = "MicroStrategy's $42 Billion Bitcoin Investment";

  // Controles de generación
  longitud: number = 280;
  tono: number = 50;
  hashtag: boolean = false;
  emoji: boolean = false;

  // Resultado
  resultado: string = '';
  mostrarResultado: boolean = false;
  modoEdicion: boolean = false;

  constructor(
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {}

  // Formatter para el pin del range de longitud
  pinFormatter(value: number): string {
    return `${value} car.`;
  }

  // Obtener label del tono basado en el valor
  getTonLabel(): string {
    if (this.tono < 25) return 'Muy Formal';
    if (this.tono < 50) return 'Formal';
    if (this.tono < 75) return 'Informal';
    return 'Muy Informal';
  }

  generar() {
    // Simular generación de texto con IA
    console.log('Generando texto con parámetros:', {
      longitud: this.longitud,
      tono: this.tono,
      hashtag: this.hashtag,
      emoji: this.emoji
    });

    // Texto mock generado
    this.resultado = `Gran noticia en el mundo crypto! MicroStrategy acaba de realizar una inversión histórica de $42 billones en Bitcoin. Este movimiento marca un precedente importante en la adopción institucional de criptomonedas.${this.hashtag ? ' #Bitcoin #Crypto #MicroStrategy' : ''}${this.emoji ? ' 🚀💰' : ''}`;

    this.mostrarResultado = true;
    this.modoEdicion = false;

    this.showToast('Texto generado exitosamente', 'success');
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

  guardar() {
    // Mock - API futura
    console.log('Guardando en historial:', this.resultado);
    this.showToast('Guardado en historial', 'success');

    // Opcional: navegar al historial después de guardar
    // setTimeout(() => {
    //   this.router.navigate(['/history']);
    // }, 1500);
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top'
    });
    await toast.present();
  }
}
