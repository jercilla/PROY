import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

interface HistoryItem {
  id: number;
  fecha: string;
  texto: string;
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

  historyItems: HistoryItem[] = [
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
  ];

  constructor() { }

  ngOnInit() {}

  abrirFiltros() {
    console.log('Abriendo filtros...');
    // Funcionalidad futura
  }

}
