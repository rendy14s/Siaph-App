import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, LoadingController, ModalController } from 'ionic-angular';
import { SiaphDocumentsApi } from './../../../shared/sdk/services/custom/SiaphDocuments';
import { SiaphDepthroleApi } from './../../../shared/sdk/services/custom/SiaphDepthrole';
import { SiaphUsercredentialApi } from './../../../shared/sdk/services/custom/SiaphUsercredential';
import { Storage } from '@ionic/storage';
import { OneSignal } from '@ionic-native/onesignal';
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
  public mineParams: any;

  public photo: string;

  public idStorage: any;
  public storageData: any;

  public tab: string;
  public dataDocument: any;
  public dataDocumentLength: number;

  public isView: boolean;
  public notView: boolean;

  public accessRoot: number;
  public showMenu: boolean;
  public shiwMenu: boolean;
  public name: any;
  public selfData: any;
  public nameUser: any;
  public publicRot: any;


  public memberAll: any;
  public dephtRoleAll: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public siaphDocumenApi: SiaphDocumentsApi,
    public storage: Storage,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    public siaphDepthroleApi: SiaphDepthroleApi,
    public modalCtrl: ModalController,
    public onesignal: OneSignal,
    public siaphUsercredentialApi: SiaphUsercredentialApi
  ) {

  }

  ionViewDidLoad() {
    // this.tab = this.navParams.get('tabSet')
    this.tab = 'HOME';

    let loader = this.loadingCtrl.create({
      duration: 3000
    });
    loader.present();

    
    
    this.storage.ready().then(() => {
      this.storage.get('siaphCredential').then((siaphCredential) => {
        this.storageData = siaphCredential;
        console.log(this.storageData, 'STORAGE NYA');

        if (this.storageData.depthCode == 'WALIKOTA') {
          this.photo = 'assets/image/garuda.png';
        } else if (this.storageData.depthCode == 'W-WALIKOTA') {
          this.photo = 'assets/image/garuda.png';
        }else if (this.storageData.depthCode == 'DPRD') {
          this.photo = 'assets/image/dprd-tangsel.jpg';
        }else {
          this.photo = 'assets/image/logo-tangsel.png';
        }

        this.accessRoot = this.storageData.access;
        this.name = this.storageData.depthCode;
        this.idStorage = this.storageData.idUser;

        console.log(this.storageData, 'Storage');
        this.mineParams = this.storageData.depthCode;
        if (this.accessRoot != 2) {
          console.log('Admin Root');
          this.publicRot = 'You are the Administrator'
          this.showMenu = true;
          this.shiwMenu = false;
        } else {
          console.log('Non Admin Root');
          this.publicRot = 'You are the User Account'
          this.showMenu = false;
          this.shiwMenu = true;
        }

        console.log(this.idStorage, 'ID LOGIN');
        const data = {
          fromDoc: this.idStorage,
          toDoc: this.idStorage
        };
        this.siaphDocumenApi.getDataDocument(data).subscribe((result) => {
          console.log(result);
          this.dataDocument = result;
          this.dataDocumentLength = this.dataDocument.length
          console.log(this.dataDocumentLength, 'Length Doc');
          if (this.dataDocumentLength == 0) {
            this.isView = true;
            this.notView = false;
          } else {
            this.isView = false;
            this.notView = true;
          }
          console.log(this.name, 'agaga');
          this.siaphDepthroleApi.find({
            where: {
              userRole: this.name
            }
          }).subscribe((result) => {
            console.log(result, 'Name user');
            this.selfData = result;
            this.nameUser =this.selfData[0].nameRole;

            this.siaphDepthroleApi.find().subscribe((result) => {
              this.memberAll = result;
              loader.dismiss();
              console.log(this.memberAll, 'Member All');

            });
          });
        });
      });
    });
  }

  public backHome() {
    this.navCtrl.setRoot('HomePage');
  }

  public detailTracking($event) {
    console.log($event);
    const docId = $event.idDoc;
    const docNo = $event.noDoc;

        this.navCtrl.push('DetailTrackingPage', { idDoc: docId, noDoc: docNo });
  }

  public createDisposisi() {
    console.log(this.mineParams);
    this.navCtrl.push('FormDisposisiPage', { mines: this.mineParams });
  }

  public logout() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Are you sure want to logout?',
      buttons: [
        {
          text: 'Yes, Im logout',
          handler: () => {
            this.onesignal.deleteTags(['userid']);
            this.storage.clear();
            window.localStorage.clear();
            this.navCtrl.setRoot('HomePage');
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  public changePass() {
    let modal = this.modalCtrl.create('ChangePasswordPage', { dataStorage: this.storageData });
    modal.present();
  }

}
