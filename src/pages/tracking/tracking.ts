import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

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
    public modalCtrl: ModalController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackingPage');
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
