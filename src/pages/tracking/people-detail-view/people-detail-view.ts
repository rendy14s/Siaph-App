import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { SiaphDocumentsApi } from './../../../shared/sdk/services/custom/SiaphDocuments';
import { SiaphTrackingdocumentsApi } from './../../../shared/sdk/services/custom/SiaphTrackingdocuments';
import { SiaphDepthroleApi } from './../../../shared/sdk/services/custom/SiaphDepthrole';
/**
 * Generated class for the PeopleDetailViewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-people-detail-view',
  templateUrl: 'people-detail-view.html',
})
export class PeopleDetailViewPage {
  public dataDoc: any;

  public tracking: any = 'status';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public siaphDocumentsApi: SiaphDocumentsApi,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public siaphTrackingdocumentsApi: SiaphTrackingdocumentsApi,
    public siaphDepthroleApi: SiaphDepthroleApi,
    public loadingCtrl: LoadingController,
  ) {
  }

  ionViewDidLoad() {
    this.dataDoc = this.navParams.get('data');
  }

  public exit() {
    this.viewCtrl.dismiss();
  }
}
