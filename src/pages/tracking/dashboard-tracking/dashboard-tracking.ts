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
  public dataDocumentLength: number;

  public isView: boolean;
  public notView: boolean;
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
        const data = {
          fromDoc: this.idStorage,
          toDoc: this.idStorage
        };
        this.siaphDocumenApi.getDataDocument(data).subscribe((result) => {
            console.log(result);
            this.dataDocument = result;
            this.dataDocumentLength = this.dataDocument.getDataDocument.length
            console.log(this.dataDocumentLength, 'Length Doc');
            if(this.dataDocumentLength == 0) {
              this.isView = true;
              this.notView = false;
            } else {
              this.isView = false;
              this.notView = true;
            }
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
