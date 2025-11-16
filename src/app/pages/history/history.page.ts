import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HistorySupabase } from 'src/app/core/services/history-supabase';

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
  
  userName: string = 'Javi';

  history: HistoryItem[] = [];

  /*historyItems: HistoryItem[] = [
    {
      id: 1,
      fecha: 'jueves, 16 de octubre de 2025',
      texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      id: 2,
      fecha: 'jueves, 16 de octubre de 2025',
      texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      id: 3,
      fecha: 'jueves, 16 de octubre de 2025',
      texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      id: 4,
      fecha: 'jueves, 16 de octubre de 2025',
      texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
  ];*/

  constructor(private historySupabase: HistorySupabase) { }

  ngOnInit() {
    this.historySupabase.history$.subscribe(items => {
    this.history = items;
  });
  }

  abrirFiltros() {
    console.log('Abriendo filtros...');
    // Funcionalidad futura
  }

}
