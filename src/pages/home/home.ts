import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public trackingPage: any;

  constructor(
    public navCtrl: NavController,
    private toast: ToastController,
    public storage: Storage
  ) {
    // this.storage.ready().then(() => {
    //   this.storage.get('siaphCredential').then((siaphCredential) => {
    //     if (siaphCredential != null || siaphCredential != undefined) {
    //       this.trackingPage = this.navCtrl.setRoot('DashboardTrackingPage', { tabSet: 'HOME' });
    //     } else {
    //       this.trackingPage = this.navCtrl.setRoot('TrackingPage');
    //     }
    //   });
    // });
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
    this.storage.ready().then(() => {
      this.storage.get('siaphCredential').then((siaphCredential) => {
        if (siaphCredential != null || siaphCredential != undefined) {
          this.navCtrl.setRoot('DashboardTrackingPage', { tabSet: 'HOME' });
        } else {
          this.navCtrl.setRoot('TrackingPage');
        }
      });
    });
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
