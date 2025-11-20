import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { Trend } from '../../../core/models/trends.model';
import { DetailPage } from '../../../pages/detail/detail.page';

// Alias para mantener compatibilidad
export type TrendingNews = Trend;

@Component({
  selector: 'app-trend-card',
  templateUrl: './trend-card.component.html',
  styleUrls: ['./trend-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class TrendCardComponent {
  @Input() news!: TrendingNews;

  constructor(private modalController: ModalController) {}

  async goToDetail() {
    const modal = await this.modalController.create({
      component: DetailPage,
      componentProps: {
        trend: this.news
      }
    });
    await modal.present();
  }
}
