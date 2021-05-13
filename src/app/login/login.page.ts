import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private sbService: SupabaseService,
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router: Router
  ) { }

  form: FormGroup;

  ngOnInit() {
    this.form = this.fb.group({
      email:    ['', [ Validators.required, Validators.email ]],
      password: ['', Validators.required]
    })
  }

  async login() {
    const loading = await this.loadingCtrl.create({ message: '' });
    loading.present();

    this.sbService.signIn(this.form.value)
      .then(async data => {
        this.router.navigate(['/tabs/tab1'], { replaceUrl: true })
      })
      .catch(e => {
        this.showError('Não foi possível fazer login');
      })
      .finally(() => {
        loading.dismiss();
      });
  }

  async signUp() {
    const loading = await this.loadingCtrl.create({ message: '' });
    loading.present();

    this.sbService.signUp(this.form.value)
      .then(async data => {
        this.router.navigate(['/tabs/tab1'], { replaceUrl: true })
      })
      .catch(e => {
        this.showError('Não foi possível se cadastrar');
      })
      .finally(() => {
        loading.dismiss();
      });
  }

  async showError(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color: 'danger',
      position: 'top'
    });

    toast.present();
  }

}
