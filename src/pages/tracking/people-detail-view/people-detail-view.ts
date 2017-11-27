import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { SiaphDocumentsApi } from './../../../shared/sdk/services/custom/SiaphDocuments';
import { SiaphTrackingdocumentsApi } from './../../../shared/sdk/services/custom/SiaphTrackingdocuments';
import { SiaphDepthroleApi } from './../../../shared/sdk/services/custom/SiaphDepthrole';
import { SiaphNoteddocumentsApi } from './../../../shared/sdk/services/custom/SiaphNoteddocuments';
import moment from 'moment';
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
  listNotesShow: boolean;
  listNotesView: boolean;
  notes: {}[];
  agendaNo: any;
  docSubject: any;
  docNo: any;
  @ViewChild('mySlider') mySlider: any;

  public arrayLength: number;
  public dynamicData: any = [];
  public shiwFinish: boolean;
  public showFinish: boolean;
  public dataTemp: any = [];
  public statusDisposisi: any;
  public date2: any;
  public date1: any;
  public dataDoc: any;
  public tracking: any = 'status';

  public dataTracking: any;
  public dataTrackingLength: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public siaphDocumentsApi: SiaphDocumentsApi,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public siaphTrackingdocumentsApi: SiaphTrackingdocumentsApi,
    public siaphDepthroleApi: SiaphDepthroleApi,
    public loadingCtrl: LoadingController,
    public siaphNoteddocumentsApi: SiaphNoteddocumentsApi,
    public toastCtrl: ToastController,
  ) {
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.goToSlide();
    }, 1000);
  }

  goToSlide() {
    this.mySlider.slideTo(this.arrayLength, 500);
  }

  ionViewDidLoad() {
    this.dataDoc = this.navParams.get('data');
    console.log(this.dataDoc, 'DATA DOC');

    let loadPub = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loadPub.present();

    this.getDataDocuments();
    this.loadNoted();

    this.siaphTrackingdocumentsApi.find({
      where: {
        idDoc: this.dataDoc.idDoc
      }
    }).subscribe(resultTrackingFirst => {
      this.dataTracking = resultTrackingFirst;
      console.log(this.dataTracking, 'DATA TRACKING FIRST');

      this.dataTrackingLength = this.dataTracking.length;

      if (this.dataTrackingLength == 0) {
        this.siaphTrackingdocumentsApi.find({
          where: {
            idDoc: this.dataDoc.noDoc
          }
        }).subscribe(resultTrackingSecond => {
          this.dataTracking = resultTrackingSecond;
          console.log(this.dataTracking, 'DATA TRACKING SECOND');

          loadPub.dismiss();

          this.date1 = this.dataTracking[0]['editedDate']
          console.log(this.date1, 'DATE 1');
          this.date2 = moment(this.date1).startOf('hour').fromNow();
          console.log(this.date2, 'DATE 2');
          this.dataTrackingLength = this.dataTracking.length;
          const dataLast = this.dataTracking[this.dataTrackingLength - 1];
          this.statusDisposisi = dataLast.statusDisposisi;
          console.log(this.statusDisposisi);

          this.siaphDepthroleApi.find({
            where: {
              idRole: this.dataTracking[0]['fromDoc']
            }
          }).subscribe((result2) => {
            console.log(result2[0]['nameRole'], 'ROLEEE 3');
            result2['RoleFrom'] = result2[0]['nameRole'];
            this.dataTemp = result2;
            console.log(this.dataTemp, 'DATATEMP');

            if (this.statusDisposisi == 'Closed') {
              this.showFinish = true;
              this.shiwFinish = false;
            } else if (this.statusDisposisi == 'Open') {
              this.showFinish = false;
              this.shiwFinish = true;
            }
            console.log(this.dataTracking, 'HSHSHSHS');
            console.log(this.dataTrackingLength, 'LLLLLLL');
            for (let i = 0; i < this.dataTrackingLength; i++) {
              this.siaphDepthroleApi.find({
                where: {
                  idRole: this.dataTracking[i].toDoc
                }
              }).subscribe((result3) => {
                console.log(result3, 'RESULT 3');
                console.log(result3['0'].nameRole, 'ROLEEE - ROLE');
                this.dynamicData[i] = result3['0'].nameRole;
                console.log(this.dynamicData, 'DYNAMIC DATA');
                this.arrayLength = this.dynamicData.length - 1;
              });
            }

          });
        });
      } else {


        this.date1 = this.dataTracking[0]['editedDate']
        console.log(this.date1, 'DATE 1');
        this.date2 = moment(this.date1).startOf('hour').fromNow();
        console.log(this.date2, 'DATE 2');
        this.dataTrackingLength = this.dataTracking.length;
        const dataLast = this.dataTracking[this.dataTrackingLength - 1];
        this.statusDisposisi = dataLast.statusDisposisi;
        console.log(this.statusDisposisi);

        this.siaphDepthroleApi.find({
          where: {
            idRole: this.dataTracking[0]['fromDoc']
          }
        }).subscribe((result2) => {
          console.log(result2[0]['nameRole'], 'ROLEEE 3');
          result2['RoleFrom'] = result2[0]['nameRole'];
          this.dataTemp = result2;
          console.log(this.dataTemp, 'DATATEMP');

          if (this.statusDisposisi == 'Closed') {
            this.showFinish = true;
            this.shiwFinish = false;
          } else if (this.statusDisposisi == 'Open') {
            this.showFinish = false;
            this.shiwFinish = true;
          }

          loadPub.dismiss();

          for (let i = 0; i < this.dataTrackingLength; i++) {
            this.siaphDepthroleApi.find({
              where: {
                idRole: this.dataTracking[i].toDoc
              }
            }).subscribe((result3) => {
              console.log(result3[0]['nameRole'], 'ROLEEE 1');
              this.dynamicData[i] = result3[0]['nameRole'];
              this.arrayLength = this.dynamicData.length - 1;
            });
          }
        });
      }
    });
  }

  public getDataDocuments() {
    this.siaphDocumentsApi.findById(this.dataDoc.idDoc).subscribe((result) => {
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

  public loadNoted() {
    console.log('COMMENT LOAD');
    console.log(this.dataDoc.idDoc, 'ID NYA NOTE');
    this.siaphNoteddocumentsApi.find({
      where: {
        idDoc: this.dataDoc.idDoc
      }
    }).subscribe((result) => {
      // console.log(result, 'Komentar Doc');
      this.notes = result;
      if (this.notes.length == 0) {
        this.siaphNoteddocumentsApi.find({
          where: {
            idDoc: this.dataDoc.noDoc
          }
        }).subscribe(resultss => {
          this.notes = resultss
          console.log(this.notes, 'HAVANA');
          console.log(this.notes.length, 'Komentar Doc');

          if (this.notes.length == 0) {
            this.listNotesView = true;
            this.listNotesShow = false;
          } else {
            this.listNotesView = false;
            this.listNotesShow = true;
          }
        });
      } else {

        console.log(this.notes.length, 'Komentar Doc');
        // for (let a = 0; a < this.notes.length; a++) {
        //   this.siaphDepthroleApi.find({
        //     where: {
        //       idRole: this.idStorage
        //     }
        //   }).subscribe((result) => {
        //     this.peopleNote = result;
        //     console.log(this.peopleNote, 'People');
        //     console.log(this.peopleNote[a]['nameRole'], 'ROLEEE 2');
        //     this.notes[a]['peopleNotes'] = this.peopleNote[a]['nameRole'];
        //   });
        // }

        if (this.notes.length == 0) {
          this.listNotesView = true;
          this.listNotesShow = false;
        } else {
          this.listNotesView = false;
          this.listNotesShow = true;
        }
      }
    }, (error) => {
      let toast = this.toastCtrl.create({
        message: 'Error Load Noted',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    });
  }


  public exit() {
    this.viewCtrl.dismiss();
  }
}
