import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { Trend } from '../../../core/models/trends.model';

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

  constructor(private router: Router) {}

  goToDetail() {
    this.router.navigate(['/detail']);
  }
}
