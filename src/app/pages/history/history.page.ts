import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HistorySupabase } from 'src/app/core/services/history-supabase';
import { AuthService } from 'src/app/core/services/auth';
import type { User } from '@supabase/supabase-js';

export interface HistoryItem {
  id: string;           // UUID
  user_id: string;      // UUID del usuario
  trend_id: string;     // UUID del trend relacionado
  text: string;         // texto generado
  length: number;       // longitud del texto (entre 120 y 1024)
  tone: 'formal' | 'informal'; // enum que definiste en PostgreSQL
  emojis: boolean;      // si se usan emojis
  hashtag: boolean;     // si se usan hashtags
  created_at: string;   // timestamp en formato ISO
}

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class HistoryPage implements OnInit {
  
  user? : User | null;

  history: HistoryItem[] = [];

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
