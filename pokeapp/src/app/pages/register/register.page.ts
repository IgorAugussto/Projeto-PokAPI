import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
})
export class RegisterPage {
  email = '';
  password = '';

  constructor(
    private auth: Auth,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  async register() {
    try {
      await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      const toast = await this.toastCtrl.create({
        message: 'Cadastro realizado com sucesso!',
        duration: 2000,
        color: 'success',
      });
      toast.present();
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } catch (err: any) {
      const toast = await this.toastCtrl.create({
        message: 'Erro ao registrar: ' + err.message,
        duration: 3000,
        color: 'danger',
      });
      toast.present();
    }
  }
}
