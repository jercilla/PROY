import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class ResetPasswordPage implements OnInit {

  newPassword: string = '';
  confirmPassword: string = '';

  showNewPassword = false;
  showConfirmPassword = false;

  returnTo: string = 'login'; // valor por defecto


  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
  this.route.queryParams.subscribe(params => {
    this.returnTo = params['returnTo'] || 'login';
  });
}

  async onResetPassword() {
    if (!this.newPassword || !this.confirmPassword) {
      await this.showToast('Por favor, completa todos los campos', 'warning');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      await this.showToast('Las contraseñas no coinciden', 'warning');
      return;
    }

    if (this.newPassword.length < 6) {
      await this.showToast('La contraseña debe tener al menos 6 caracteres', 'warning');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Actualizando contraseña...',
      spinner: 'crescent'
    });

    await loading.present();

    const success = await this.authService.updatePassword(this.newPassword);

    await loading.dismiss();

    if (success) {
      await this.showToast('Contraseña actualizada correctamente', 'success');
      this.router.navigate(['/login']);
    } else {
      await this.showToast('Error al actualizar la contraseña. El enlace puede haber expirado.', 'danger');
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

  close() {
  this.router.navigate([`/${this.returnTo}`]);
}
}
