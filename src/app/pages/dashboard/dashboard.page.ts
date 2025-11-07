import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { TrendCardComponent, TrendingNews } from '../../shared/components/trend-card/trend-card.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, TrendCardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardPage implements OnInit {
  currentDate: string = '';
  lastUpdate: string = '';
  userName: string = 'Usuario';

  trendingNews: TrendingNews[] = [
    {
      id: 1,
      title: 'Noticia Trending 1',
      description: 'Esta es una descripción de ejemplo para la primera noticia trending del día.',
      category: 'Tecnología'
    },
    {
      id: 2,
      title: 'Noticia Trending 2',
      description: 'Esta es una descripción de ejemplo para la segunda noticia trending del día.',
      category: 'Entretenimiento'
    },
    {
      id: 3,
      title: 'Noticia Trending 3',
      description: 'Esta es una descripción de ejemplo para la tercera noticia trending del día.',
      category: 'Deportes'
    }
  ];

  slideOpts = {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  };

  constructor(private router: Router) {}

  ngOnInit() {
    this.updateCurrentDate();
    this.updateLastUpdateTime();
  }

  updateCurrentDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    this.currentDate = `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  updateLastUpdateTime() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    this.lastUpdate = `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  goToSettings() {
    this.router.navigate(['/settings']);
  }

  goToHistory() {
    this.router.navigate(['/history']);
  }

  goToDetail() {
    this.router.navigate(['/detail']);
  }

  goToNew() {
    this.router.navigate(['/new']);
  }

  refreshCards() {
    this.updateLastUpdateTime();
    // Aquí se recargarían las cards desde el servicio
    console.log('Recargando tendencias...');
  }
}
