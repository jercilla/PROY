import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HistorySupabase } from 'src/app/core/services/history-supabase';
import { AuthService } from 'src/app/core/services/auth';
import type { User } from '@supabase/supabase-js';
import type { History } from 'src/app/core/models/history.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class HistoryPage implements OnInit {
  
  user? : User | null;

  history: History[] = [];

  constructor(private historySupabase: HistorySupabase, private authService : AuthService) { }

  async ngOnInit() {
    // Leer el usuario actual
    this.user  = await this.authService.getUser();
    // Suscribirse al historial
    this.historySupabase.history$.subscribe(items => {
      this.history = items;
    });
  }

  abrirFiltros() {
    console.log('Abriendo filtros...');
    // Funcionalidad futura
  }

}
