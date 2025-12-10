import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-forgot-password-modal',
  template: `
    <ion-content class="forgot-modal">
      <div class="full-center">
        <div class="modal-container">
          <button class="close-btn" (click)="close()">
            <ion-icon name="close"></ion-icon>
          </button>

          <h2>Recupera tu contraseña</h2>

          <ion-item class="input-wrapper">
            <ion-input
              [(ngModel)]="resetEmail"
              type="email"
              placeholder="ejemplo@email.com">
            </ion-input>
          </ion-item>

          <ion-button expand="block" class="action-btn" (click)="onResetPassword()">
            Recuperar
          </ion-button>
        </div>
      </div>
    </ion-content>
  `,
  styles: [`


    .forgot-modal {
      --background: rgba(0,0,0,0.4); /* si quieres fondo oscuro */
    }

    /* ⭐ Este div fuerza el centrado vertical y horizontal */
    .full-center {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }



    .modal-container {
      background: var(--ion-background-color, #fff);
      padding: 30px 20px;
      border-radius: 16px;
      text-align: center;

      /* ⭐ Centrado total */
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      width: 100%;
      max-width: 350px;
      margin: auto;
      position: relative;
    }

    .close-btn {
      position: absolute;
      top: 12px;
      right: 12px;
      background: none;
      border: none;
      padding: 6px;
      cursor: pointer;
    }

    .close-btn ion-icon {
      font-size: 22px;
      color: var(--color-electric);
    }

    h2 {
      margin: 10px 0 20px;
      font-size: 1.4rem;
      font-weight: 600;
      width: 100%;
      text-align: center; /* ⭐ */
    }

    .input-wrapper {
      width: 100%;
      max-width: 260px;  /* ⭐ centra visualmente todo */
      --background: var(--ion-color-light);
      --border-radius: 8px;
      margin-bottom: 20px;

      ion-item {
        --background: #f2f2f2;     /* fondo del input */
        --border-radius: 8px;       /* bordes redondeados */
        --padding-start: 10px;      /* padding interno */
        --inner-padding-end: 10px;
        margin-top: 2px;
      }

      ion-input {
        color: var(--color-electric);   /* texto ingresado */
        font-family: var(--font-text);
      }

    }

    .action-btn {
      width: 100%;
      max-width: 260px; /* ⭐ mismo ancho del input */
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
