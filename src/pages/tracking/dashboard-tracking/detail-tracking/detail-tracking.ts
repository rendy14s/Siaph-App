import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { SiaphTrackingdocumentsApi } from './../../../../shared/sdk/services/custom/SiaphTrackingdocuments';
import { Storage } from '@ionic/storage';
import { SiaphDepthroleApi } from './../../../../shared/sdk/services/custom/SiaphDepthrole';
import { SiaphDocumentsApi } from './../../../../shared/sdk/services/custom/SiaphDocuments';
/**
 * Generated class for the DetailTrackingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-tracking',
  templateUrl: 'detail-tracking.html',
})
export class DetailTrackingPage {

  @ViewChild('mySlider') mySlider: any;

  public idDoc: any;
  public dataTracking: any;
  public dataTrackingLength: any;
  public dynamicData: any = [];
  public dataTemp: any = [];

  public arrayLength: any;
  public showCss: boolean;


  public dataDoc: any;
  public docNo: any;
  public docSubject: any;
  public agendaNo: any;

  public statusDisposisi: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public siaphTrackingdocumentsApi: SiaphTrackingdocumentsApi,
    public storage: Storage,
    public siaphDepthroleApi: SiaphDepthroleApi,
    public siaphDocumentsApi: SiaphDocumentsApi,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {

    setTimeout(() => {
      this.goToSlide();
    }, 500);
  }

  goToSlide() {
    this.mySlider.slideTo(this.arrayLength, 500);
  }

  ionViewDidLoad() {
    this.idDoc = this.navParams.get('idDoc');
    this.getDataDocuments();

    let loadPub = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loadPub.present();

    this.siaphTrackingdocumentsApi.find({
      where: {
        idDoc: this.idDoc
      }
    }).subscribe(result1 => {
      this.dataTracking = result1;
      console.log(this.dataTracking, 'Data Tracking');
      this.dataTrackingLength = this.dataTracking.length;
      const dataLast = this.dataTracking[this.dataTrackingLength - 1];
      this.statusDisposisi = dataLast.statusDisposisi;
      console.log(this.statusDisposisi);
      this.siaphDepthroleApi.find({
        where: {
          idRole: this.dataTracking[0]['fromDoc']
        }
      }).subscribe((result2) => {
        result2['RoleFrom'] = result2[0]['nameRole'];
        this.dataTemp = result2;

        loadPub.dismiss();

        for (let i = 0; i < this.dataTrackingLength; i++) {
          this.siaphDepthroleApi.find({
            where: {
              idRole: this.dataTracking[i].toDoc
            }
          }).subscribe((result3) => {
            this.dynamicData[i] = result3[0]['nameRole'];
            this.arrayLength = this.dynamicData.length - 1;
          });
        }
      });
    });
  }

  public getDataDocuments() {
    this.siaphDocumentsApi.findById(this.idDoc).subscribe((result) => {
      this.dataDoc = result;
      console.log(this.dataDoc, 'Doc Data');

      this.docNo = this.dataDoc.noDoc;
      this.docSubject = this.dataDoc.subjectDoc;
      this.agendaNo = this.dataDoc.noAgendaDoc;
    }, error => {
      let alert = this.alertCtrl.create({
        subTitle: " No Internet Access! Cek your connection",
        buttons: [
          {
            text: 'Dismiss',
            handler: () => {
              this.navCtrl.setRoot('DashboardTrackingPage');
            }
          }]
      });
      alert.present();
    });
  }

  public approved() {
    console.log('Approve');
  }

  public cancel() {
    this.navCtrl.setRoot('DashboardTrackingPage');
  }

}
