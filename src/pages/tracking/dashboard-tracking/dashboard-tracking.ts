import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DashboardTrackingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard-tracking',
  templateUrl: 'dashboard-tracking.html',
})
export class DashboardTrackingPage {

  public tab: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.tab = this.navParams.get('tabSet')
  }

  public backHome() {
    this.navCtrl.setRoot('HomePage');
  }

  public detailTracking() {
    this.navCtrl.push('DetailTrackingPage');
  }

  public createDisposisi() {
    this.navCtrl.push('FormDisposisiPage');
  }

}
