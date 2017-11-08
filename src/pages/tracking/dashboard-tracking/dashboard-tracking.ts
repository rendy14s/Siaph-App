import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SiaphDocumentsApi } from './../../../shared/sdk/services/custom/SiaphDocuments';
import { Storage } from '@ionic/storage';
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
  public idStorage: any;
  public storageData: any;

  public tab: string;
  public dataDocument: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public siaphDocumenApi: SiaphDocumentsApi,
    public storage: Storage,
  ) {

  }

  ionViewDidLoad() {
    this.tab = this.navParams.get('tabSet')

    this.storage.ready().then(() => {
      this.storage.get('siaphCredential').then((siaphCredential) => {
        this.storageData = siaphCredential;
        this.idStorage = this.storageData.idUser;

        console.log(this.idStorage, 'ID LOGIN');
        this.siaphDocumenApi.find({
          where: {
            And: [
              { fromDoc: this.idStorage },
              { toDoc: this.idStorage },
            ]
          }, order: 'createDateDoc DESC',
        }).subscribe((result) => {
          console.log(result);
          this.dataDocument = result;
        })

      });
    });
  }

  public backHome() {
    this.navCtrl.setRoot('HomePage');
  }

  public detailTracking($event) {
    const docId = $event;
    this.navCtrl.push('DetailTrackingPage', { idDoc: docId });
  }

  public createDisposisi() {
    this.navCtrl.push('FormDisposisiPage');
  }

}
