import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { TrendCardComponent, TrendingNews } from '../../shared/components/trend-card/trend-card.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TrendRepository } from 'src/app/core/services/repositories/trend';
import { HttpClientModule } from '@angular/common/http';
import type { User } from '@supabase/supabase-js';
import { AuthService } from 'src/app/core/services/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, TrendCardComponent, HttpClientModule],
  providers: [TrendRepository],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardPage implements OnInit {
  currentDate: string = '';
  lastUpdate: string = '';
  user? : User | null;

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
    private trendRepository: TrendRepository,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    this.updateCurrentDate();
    this.updateLastUpdateTime();

    // Leer el usuario actual
    this.user  = await this.authService.getUser();

    // Suscribirse a las tendencias
    this.trendRepository.trends$.subscribe({
      next: (trends) => {
        this.trendingNews = trends;
        console.log('Tendencias actualizadas:', trends);
      },
      error: (err) => {
        console.error('Error al cargar tendencias:', err);
      }
    });

    // Suscribirse al estado de carga
    this.trendRepository.loading$.subscribe({
      next: (loading) => {
        this.isLoading = loading;
      }
    });

    // Cargar tendencias explícitamente (el usuario ya está autenticado aquí)
    this.trendRepository.getAll();
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
    this.trendRepository.refresh();
  }
}
