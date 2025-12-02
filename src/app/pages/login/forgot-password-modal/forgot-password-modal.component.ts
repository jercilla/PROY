import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-forgot-password-modal',
  template: `
    <ion-content class="forgot-modal">
      <div class="modal-container">
        <button class="close-btn" (click)="close()">
          <ion-icon name="close"></ion-icon>
        </button>
        <h2>Forgot Password</h2>
        <ion-item>
          <ion-input
            [(ngModel)]="resetEmail"
            type="email"
            placeholder="Enter your account email">
          </ion-input>
        </ion-item>
        <ion-button expand="block" (click)="onResetPassword()">
          Recuperar Contraseña
        </ion-button>
      </div>
    </ion-content>
  `,
  styles: [`
    .forgot-modal {
      --background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .modal-container {
      background: var(--ion-background-color, #fff);
      padding: 30px 20px;
      text-align: center;
      position: relative;
      border-radius: 16px;
      margin: 20px;
      width: 100%;
      max-width: 350px;
    }

    .close-btn {
      position: absolute;
      top: 12px;
      right: 12px;
      background: none;
      border: none;
      padding: 6px;
      cursor: pointer;

      ion-icon {
        font-size: 22px;
        color: var(--color-electric);
      }
    }

    h2 {
      margin: 10px 0 20px;
      font-size: 1.4rem;
      font-weight: 600;
    }

    ion-item {
      --background: var(--ion-color-light);
      --border-radius: 8px;
      margin-bottom: 20px;
    }

    ion-button[expand="block"] {
      margin-top: 10px;
    }
  `],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class ForgotPasswordModalComponent {
  resetEmail: string = '';

  constructor(
    private modalController: ModalController,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private authService: AuthService
  ) {}

  close() {
    this.modalController.dismiss();
  }

  async onResetPassword() {
    if (!this.resetEmail) {
      await this.showToast('Por favor, introduce tu email', 'warning');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Enviando email...',
      spinner: 'crescent'
    });

    await loading.present();

    const success = await this.authService.resetPassword(this.resetEmail);

    await loading.dismiss();

    if (success) {
      await this.showToast('Email enviado. Revisa tu bandeja de entrada.', 'success');
      this.modalController.dismiss();
    } else {
      await this.showToast('Error al enviar el email. Verifica que el email sea correcto.', 'danger');
    }
  }

  async showToast(message: string, color: string) {
    const iconMap: Record<string, string> = {
      success: 'checkmark-circle-outline',
      warning: 'alert-circle-outline',
      danger: 'close-circle-outline'
    };

    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
      color,
      icon: iconMap[color] || undefined,
      cssClass: 'toast-card'
    });

    await toast.present();
  }
}
