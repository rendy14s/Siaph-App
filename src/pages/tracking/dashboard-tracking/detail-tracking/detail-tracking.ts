import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { SiaphTrackingdocumentsApi } from './../../../../shared/sdk/services/custom/SiaphTrackingdocuments';
import { Storage } from '@ionic/storage';
import { SiaphDepthroleApi } from './../../../../shared/sdk/services/custom/SiaphDepthrole';
import { SiaphDocumentsApi } from './../../../../shared/sdk/services/custom/SiaphDocuments';
import moment from 'moment';
import { FormBuilder, Validators } from '@angular/forms';
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

  public CurrentDate: any;
  public userName: any;
  public storageData: any;
  public idStorage: any;

  public statusDisposisi: any;

  public dataDepthRole: any;
  public selectto: any;
  public disposisiForm: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public siaphTrackingdocumentsApi: SiaphTrackingdocumentsApi,
    public storage: Storage,
    public siaphDepthroleApi: SiaphDepthroleApi,
    public siaphDocumentsApi: SiaphDocumentsApi,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public fb: FormBuilder,
  ) {

    setTimeout(() => {
      this.goToSlide();
    }, 500);

    this.storage.ready().then(() => {
      this.storage.get('siaphCredential').then((siaphCredential) => {
        this.storageData = siaphCredential;
        console.log(this.storageData, 'Storage');
        this.userName = this.storageData.username;
        this.idStorage = this.storageData.idUser;

        this.siaphDepthroleApi.find().subscribe((result) => {
          this.dataDepthRole = result;
          console.log(this.dataDepthRole, 'Data Role');
          // this.selectto = this.dataDepthRole[6].nameRole;
        });
      });
    });

    this.disposisiForm = this.fb.group({
      'selectto': ['TIM PEMBAHASAN RAPERWAL', Validators.compose([Validators.required])],
      // 'nodoc': ['', Validators.compose([Validators.required])],
      // 'receiptDate': [this.receiptDate, Validators.compose([Validators.required])],
      // 'noAgenda': ['', Validators.compose([Validators.required])],
      // 'subject': ['', Validators.compose([Validators.required])],
      // 'noted': ['', Validators.compose([Validators.required])],
    });

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

    const dataApproved = {
      idDoc: this.dataTracking.idDoc,
      fromDoc: this.idStorage,
      toDoc: this.disposisiForm.controls.selectto.value,
      statusDisposisi: 'Open',
      prosesDate: this.formatDate(),
      editedDate: this.formatDate(),
      editedBy: this.userName
    };

    this.siaphTrackingdocumentsApi.create(dataApproved).subscribe((result) => {
      console.log(result);
    }, (error) => {
      console.log(error, 'Error Approved');
    });
  }

  public formatDate() {
    this.CurrentDate = moment().format();
    return this.CurrentDate;
  }

  public cancel() {
    this.navCtrl.setRoot('DashboardTrackingPage');
  }

}
