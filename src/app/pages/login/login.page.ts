import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class LoginPage  implements OnInit {
  email: string = '';
  password: string = '';
  isLogin: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    // Si ya está autenticado, redirigir al dashboard
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSegmentChange(event: any) {
    this.isLogin = event.detail.value;
  }

  async onSubmit() {
    if (!this.email || !this.password) {
      await this.showToast('Por favor, completa todos los campos', 'warning');
      return;
    }

    const loading = await this.loadingController.create({
      message: this.isLogin ? 'Iniciando sesión...' : 'Registrando...',
      spinner: 'crescent'
    });

    await loading.present();

    try {
      if (this.isLogin) {
        const success = await this.authService.login(this.email, this.password);
        if (success) {
          await loading.dismiss();
          await this.showToast('Bienvenido!', 'success');
          this.router.navigate(['/dashboard']);
        }
      } else {
        // Mock registro - por ahora solo simula el proceso
        await new Promise(resolve => setTimeout(resolve, 1000));
        await loading.dismiss();
        await this.showToast('Cuenta creada exitosamente. Ahora puedes iniciar sesión.', 'success');
        this.isLogin = true;
      }
    } catch (error) {
      await loading.dismiss();
      await this.showToast('Error en el proceso. Intenta nuevamente.', 'danger');
    }
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'top'
    });
    await toast.present();
  }
}
