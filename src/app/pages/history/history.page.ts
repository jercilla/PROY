import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonDatetime, IonicModule } from '@ionic/angular';
import { HistoryRepository } from 'src/app/core/services/repositories/history';
import { AuthService } from 'src/app/core/services/auth';
import type { User } from '@supabase/supabase-js';
import type { HistoryItem } from 'src/app/core/models/history.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class HistoryPage implements OnInit {

  user? : User | null;

  selectedDate?: string;

  history: HistoryItem[] = [];
  searchTerm: string = '';
  filteredItems: HistoryItem[] = [];

  showCalendar : boolean = false;



  constructor(private historyRepository: HistoryRepository, private authService : AuthService) { }

  async ngOnInit() {
    // Leer el usuario actual
    this.user  = await this.authService.getUser();
    // Suscribirse al historial
    this.historyRepository.history$.subscribe(items => {
      this.history = items;
      this.filteredItems = items;

    });
  }

  applyFilters() {
    this.filteredItems = this.history.filter(item => {

      // Filtrado por texto
      const textMatch = item.text.toLowerCase().includes(this.searchTerm.toLowerCase());

      // Filtrado por fecha exacta
      let dateMatch = true;
      if (this.selectedDate) {
        const selectedTime = new Date(this.selectedDate).setHours(0,0,0,0);
        const itemTime = new Date(item.created_at).setHours(0,0,0,0);
        dateMatch = selectedTime === itemTime;
      }

      return textMatch && dateMatch;
    });
  }

  toggleCalendar() {
    this.showCalendar = !this.showCalendar; // alterna entre mostrar y ocultar
  }

  clearDateFilter() {
    this.selectedDate = '';
    this.showCalendar = false;
    this.searchTerm ='';
    this.applyFilters();
  }

}


