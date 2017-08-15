import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    private toast: ToastController
  ) {

  }

  public perda() {
    console.log('klik');
    this.navCtrl.push('PerdaPage');
  }

  public perwal() {
    console.log('klik');
    this.navCtrl.push('PerwalPage');
  }

  public tracking() {
    let toast = this.toast.create({
      message: 'Under Development',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  public galeri() {
    console.log('klik');
    this.navCtrl.push('GaleriPage');
  }

  public kontak() {
    let toast = this.toast.create({
      message: 'Under Development',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  public account() {
    let toast = this.toast.create({
      message: 'Under Development',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  public update() {
    let toast = this.toast.create({
      message: 'Under Development',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  public profil() {
    let toast = this.toast.create({
      message: 'Under Development',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  public perpus() {
    let toast = this.toast.create({
      message: 'Under Development',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  public kepwal() {
    console.log('klik');
    this.navCtrl.push('KepwalPage');
  }

}
