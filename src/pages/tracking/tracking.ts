import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the TrackingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tracking',
  templateUrl: 'tracking.html',
})
export class TrackingPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public storage: Storage
  ) {
  }

  ionViewDidLoad() {
    this.storage.ready().then(() => {
      this.storage.get('siaphCredential').then((siaphCredential) => {
        if (siaphCredential != null || siaphCredential != undefined) {
          this.navCtrl.setRoot('DashboardTrackingPage');
        }
      });
    });
  }

  public modalShow() {
    let view = this.modalCtrl.create('PeopleDetailViewPage');
    view.present();
  }

  public login() {
    this.navCtrl.setRoot('LoginPage');
  }

  public back() {
    this.navCtrl.setRoot('HomePage');
  }

}
