import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { TrendCardComponent, TrendingNews } from '../../shared/components/trend-card/trend-card.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TrendsSupabase } from '../../core/services/trends-supabase';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, TrendCardComponent, HttpClientModule],
  providers: [TrendsSupabase],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardPage implements OnInit {
  currentDate: string = '';
  lastUpdate: string = '';
  userName: string = 'Usuario';

  trendingNews: TrendingNews[] = [];
  isLoading: boolean = false;

  slideOpts = {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  };

  constructor(
    private router: Router,
    private trendsService: TrendsSupabase
  ) {}

  ngOnInit() {
    this.updateCurrentDate();
    this.updateLastUpdateTime();

    // Suscribirse a las tendencias
    this.trendsService.trends$.subscribe({
      next: (trends) => {
        this.trendingNews = trends;
        console.log('Tendencias actualizadas:', trends);
      },
      error: (err) => {
        console.error('Error al cargar tendencias:', err);
      }
    });

    // Suscribirse al estado de carga
    this.trendsService.loading$.subscribe({
      next: (loading) => {
        this.isLoading = loading;
      }
    });

    // Cargar tendencias explícitamente (el usuario ya está autenticado aquí)
    this.trendsService.loadTrends();
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
    // Recargar las tendencias desde el servicio
    console.log('Recargando tendencias...');
    this.trendsService.refresh();
  }
}
