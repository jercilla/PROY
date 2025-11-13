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
  ) {  }

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
        await loading.dismiss();
        if (success) {
          await this.showToast('Bienvenido!', 'success');
          this.router.navigate(['/dashboard']);
        }else{
          await this.showToast('Credenciales inválidas', 'danger');
        }
      } else {
        await this.authService.signup(this.email, this.password);
        await this.showToast('Registro realizado. Revisa tu email para verificar tu cuenta.', 'success');
        this.isLogin = true;
      }
    } catch (error) {

      console.error('Error inesperado:', error);
      let errorMessage = 'Error desconocido. Intenta nuevamente.';

      // Verificamos si hay un error de Supabase y cuál es
      if (error && typeof error === 'object' && 'message' in error) {
        const message = (error as { message: string }).message.toLowerCase();
        if (message.includes('already exists')) {
          errorMessage = 'El usuario ya existe.';
        } else if (message.includes('weak password') || message.includes('at least 6 characters')) {
          errorMessage = 'Contraseña débil. Debe tener al menos 6 caracteres.';
        } else if (message.includes('format is invalid')) {
          errorMessage = 'Formato de email inválido.';
        } else {
          errorMessage = message;
        }
      }

      await this.showToast(errorMessage, 'danger');
    } finally {
      await loading.dismiss();
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
