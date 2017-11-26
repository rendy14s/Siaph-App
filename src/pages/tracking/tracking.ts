import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { SiaphDocumentsApi } from './../../shared/sdk/services/custom/SiaphDocuments';
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
  public dataDocuments: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public siaphDocumentsApi: SiaphDocumentsApi,
    public alertCtrl: AlertController
  ) {
    
  }

  ionViewDidLoad() {
    const limit = {
      limit: 3
    }
    this.siaphDocumentsApi.getDataDocumentAll(limit).subscribe(result => {
      console.log(result, 'Result');
      this.dataDocuments = result;
    })
  }

  public modalShow(event) {
    // let view = this.modalCtrl.create('PeopleDetailViewPage', { data: event });
    // view.present();

    let alert = this.alertCtrl.create({
      subTitle: 'Ups.. Sorry! this feature under migration database',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  public login() {
    this.navCtrl.setRoot('LoginPage');
  }

  public back() {
    this.navCtrl.setRoot('HomePage');
  }

}
