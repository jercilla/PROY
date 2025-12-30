import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TrendCardComponent, TrendingNews } from '../../shared/components/trend-card/trend-card.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TrendRepository } from 'src/app/core/services/repositories/trend';
import { HttpClientModule } from '@angular/common/http';
import type { User } from '@supabase/supabase-js';
import { AuthService } from 'src/app/core/services/auth';
import { register } from 'swiper/element/bundle';
import { DetailPage } from '../detail/detail.page';

register();

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

  // Definir variables de fecha
  currentDate: string = '';
  lastUpdate: string = '';

  // Definir variable para el usuario
  user? : User | null;

  // Definir variable para el conjunto de noticias
  trendingNews: TrendingNews[] = [];

  // Definir variable para el estado de carga
  isLoading: boolean = false;

  // Definir variable para el índice del slide actual
  currentSlideIndex = 0;

  // Definir configuración del carrusel
  slideOpts = {
  slidesPerView: 1,
  spaceBetween: 0,
  pagination: {
    clickable: true,
    type: 'bullets',  // Can be 'bullets', 'fraction', or 'progressbar'
    dynamicBullets: true,  // Optional: Makes bullets smaller if there are many slides
  },
  };


  constructor(
    private router: Router,
    private trendRepository: TrendRepository,
    private authService: AuthService,
    private modalController: ModalController
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

  async goToDetail() {
    const trend = this.getCurrentTrend();
    if (!trend) return;

    const modal = await this.modalController.create({
      component: DetailPage,
      componentProps: { trend },
      cssClass: 'modal-popup'
    });
    await modal.present();
  }

  goToNew() {
    const trend = this.getCurrentTrend();
    if (!trend) return;

    this.router.navigate(['/new'], {
      queryParams: { trend: JSON.stringify(trend) }
    });
  }

  refreshCards() {
    this.updateLastUpdateTime();
    // Recargar las tendencias desde el servicio
    console.log('Recargando tendencias...');
    this.trendRepository.refresh();
  }

  onSlideChange(event: any) {
    const swiper = event.detail[0];
    this.currentSlideIndex = swiper.activeIndex;
  }

  getCurrentTrend(): TrendingNews | null {
  if (!this.trendingNews || this.trendingNews.length === 0) return null;
  return this.trendingNews[this.currentSlideIndex];
  }

}
