import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { SiaphTrackingdocumentsApi } from './../../../../shared/sdk/services/custom/SiaphTrackingdocuments';
import { Storage } from '@ionic/storage';
import { SiaphDepthroleApi } from './../../../../shared/sdk/services/custom/SiaphDepthrole';
import { SiaphDocumentsApi } from './../../../../shared/sdk/services/custom/SiaphDocuments';
import { SiaphNoteddocumentsApi } from './../../../../shared/sdk/services/custom/SiaphNoteddocuments';
import moment from 'moment';
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

  public date2: string;
  public date1: any;

  @ViewChild('mySlider') mySlider: any;
  public DOCUMENTS: string = "DOC";

  public idDoc: any;
  public noDocs: any;
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

  public shiwFinish: boolean;
  public showFinish: boolean;
  public datax;
  public noted: any;
  public notes: {}[];
  public peopleNote: {}[];
  public listNotesShow: boolean;
  public listNotesView: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public siaphTrackingdocumentsApi: SiaphTrackingdocumentsApi,
    public storage: Storage,
    public siaphDepthroleApi: SiaphDepthroleApi,
    public siaphDocumentsApi: SiaphDocumentsApi,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public siaphNoteddocumentsApi: SiaphNoteddocumentsApi
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
    this.idDoc = this.navParams.get('idDoc');
    this.noDocs = this.navParams.get('noDoc');

    console.log(this.idDoc, 'ID NYA DOC');
    console.log(this.noDocs, 'NO NYA DOC');
    let loadPub = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loadPub.present();

    this.getDataDocuments();
    this.loadNoted();

    this.storage.ready().then(() => {
      this.storage.get('siaphCredential').then((siaphCredential) => {
        this.storageData = siaphCredential;
        console.log(this.storageData, 'Storage');
        this.userName = this.storageData.username;
        this.idStorage = this.storageData.idUser;

        this.siaphDepthroleApi.find({
          where: {
            idUser: { nlike: this.idStorage }
          }
        }).subscribe((result) => {
          this.dataDepthRole = result;
          console.log(this.dataDepthRole, 'Data Role');
        });

        this.siaphTrackingdocumentsApi.find({
          where: {
            idDoc: this.idDoc
          }
        }).subscribe(result1 => {
          this.dataTracking = result1;
          console.log(this.dataTracking, 'Data Tracking');

          if (this.dataTracking.length == 0) {
            console.log(123123);
            this.siaphTrackingdocumentsApi.find({
              where: {
                idDoc: this.noDocs
              }
            }).subscribe(result => {
              console.log(result, 'CKCKCKCCKCK');
              this.dataTracking = result;
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
        }, (error) => {
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
    if (this.selectto == null || this.selectto == undefined) {
      let alert = this.alertCtrl.create({
        title: 'ATTENTION PLEASE!',
        message: 'Column "Letter To" is empty! If this true. The Document will be automatic status is Closed or Fully Approved and be noted name by you. ',
        buttons: [
          {
            text: 'Disagree',
            handler: () => {
              console.log('Disagree clicked');
            }
          },
          {
            text: 'Agree',
            handler: () => {
              const dataApproved = {
                idDoc: this.dataTracking[0].idDoc,
                fromDoc: this.idStorage,
                toDoc: this.idStorage,
                statusDisposisi: 'Closed',
                prosesDate: this.formatDate(),
                editedDate: this.formatDate(),
                editedBy: this.userName
              };

              this.siaphTrackingdocumentsApi.create(dataApproved).subscribe((result) => {
                console.log(result);

                const datasDocument = {
                  noDoc: this.docNo,
                  fromDoc: this.idStorage,
                  toDoc: this.selectto,
                  dateDoc: this.formatDate(),
                  subjectDoc: this.dataDoc.subjectDoc,
                  createDateDoc: this.formatDate(),
                  publishedByDoc: this.userName
                };

                this.siaphDocumentsApi.create(datasDocument).subscribe(result => {
                  console.log('Sukses yaaa');
                }, (error) => {
                  console.log(error, 'ERROR yaaa');
                });

                this.datax = result;
                const dataNoted = {
                  idTracking: this.datax.idTracking,
                  idDoc: this.datax.docNo,
                  dateNoted: this.formatDate(),
                  fromNote: this.idStorage,
                  notesDoc: this.noted
                };
                if (this.noted == null || this.noted == undefined) {
                  let toast = this.toastCtrl.create({
                    message: 'Success Disposisi!',
                    duration: 3000,
                    position: 'bottom'
                  });
                  toast.present();
                  this.navCtrl.setRoot('DashboardTrackingPage');
                } else {
                  this.siaphNoteddocumentsApi.create(dataNoted).subscribe((result) => {
                    let toast = this.toastCtrl.create({
                      message: 'Success Disposisi!',
                      duration: 3000,
                      position: 'bottom'
                    });
                    toast.present();
                    this.navCtrl.setRoot('DashboardTrackingPage');
                  })
                }
              }, (error) => {
                console.log(error, 'Error Approved');
              });

            }
          }
        ]
      });
      alert.present();
    } else {

      const dataApproved = {
        idDoc: this.dataTracking[0].idDoc,
        fromDoc: this.idStorage,
        toDoc: this.selectto,
        statusDisposisi: 'Open',
        prosesDate: this.formatDate(),
        editedDate: this.formatDate(),
        editedBy: this.userName
      };

      this.siaphTrackingdocumentsApi.create(dataApproved).subscribe((result) => {
        console.log(result);
        this.datax = result;
        const dataNoted = {
          idTracking: this.datax.idTracking,
          idDoc: this.datax.idDoc,
          dateNoted: this.formatDate(),
          fromNote: this.idStorage,
          notesDoc: this.noted
        };

        const datasDocument = {
          noDoc: this.docNo,
          fromDoc: this.idStorage,
          toDoc: this.selectto,
          dateDoc: this.formatDate(),
          subjectDoc: this.dataDoc.subjectDoc,
          createDateDoc: this.formatDate(),
          publishedByDoc: this.userName
        };

        this.siaphDocumentsApi.create(datasDocument).subscribe(result => {
          console.log('Sukses yaaa');
        }, (error) => {
          console.log(error, 'ERROR yaaa');
        });

        if (this.noted == null || this.noted == undefined) {
          let toast = this.toastCtrl.create({
            message: 'Success Disposisi!',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
          this.navCtrl.setRoot('DashboardTrackingPage');
        } else {
          this.siaphNoteddocumentsApi.create(dataNoted).subscribe((result) => {
            let toast = this.toastCtrl.create({
              message: 'Success Disposisi!',
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
            this.navCtrl.setRoot('DashboardTrackingPage');
          })
        }

      }, (error) => {
        console.log(error, 'Error Approved');
      });

    }
  }

  public loadNoted() {
    console.log('COMMENT LOAD');
    console.log(this.idDoc, 'ID NYA NOTE');
    this.siaphNoteddocumentsApi.find({
      where: {
        idDoc: this.idDoc
      }
    }).subscribe((result) => {
      // console.log(result, 'Komentar Doc');
      this.notes = result;
      if (this.notes.length == 0) {
        this.siaphNoteddocumentsApi.find({
          where: {
            idDoc: this.noDocs
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

  public formatDate() {
    this.CurrentDate = moment().format();
    return this.CurrentDate;
  }

  public cancel() {
    this.navCtrl.setRoot('DashboardTrackingPage');
  }

}
