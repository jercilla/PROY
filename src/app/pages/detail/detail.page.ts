import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { Trend } from '../../core/models/trends.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class DetailPage implements OnInit {
  @Input() trend!: Trend;

  constructor(
    private modalController: ModalController,
    private router: Router
  ) { }

  ngOnInit() {}

  closeModal() {
    this.modalController.dismiss();
  }

  async crearContenido() {
    // Cerrar el modal y navegar a la página de creación
    await this.modalController.dismiss();
    this.router.navigate(['/new']);
  }
}
