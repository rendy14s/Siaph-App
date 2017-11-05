import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SiaphDocumentsApi } from './../../../../shared/sdk/services/custom/SiaphDocuments';
import { SiaphTrackingdocumentsApi } from './../../../../shared/sdk/services/custom/SiaphTrackingdocuments';
import { SiaphDepthroleApi } from './../../../../shared/sdk/services/custom/SiaphDepthrole';
import { SiaphNoteddocumentsApi } from './../../../../shared/sdk/services/custom/SiaphNoteddocuments';
import { Storage } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import { FileUploadOptions } from '@ionic-native/file-transfer';
import { UUID } from 'angular2-uuid';
import moment from 'moment';
import { FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the FormDisposisiPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-form-disposisi',
  templateUrl: 'form-disposisi.html',
})
export class FormDisposisiPage {
  public disposisiForm: any;
  public idStorage: any;
  public roleName: any;

  public dataDepthRole: any;
  public dataRole: any;

  public todays: any = new Date();
  public receiptDate: any;
  public selectto: any;
  public nodoc: any;
  public noAgenda;
  public photo: any = '';
  public subject: any;
  public noted: any;

  public storageData: any;
  public userName: any;

  public dataDoc: any;
  public idDocument: any;

  public CurrentDate: any;
  public dataTracking: any;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public siaphDocumentsApi: SiaphDocumentsApi,
    public storage: Storage,
    public siaphDepthroleApi: SiaphDepthroleApi,
    public alertCtrl: AlertController,
    public camera: Camera,
    public siaphTrackingdocumentsApi: SiaphTrackingdocumentsApi,
    public fb: FormBuilder,
    public siaphNoteddocumentsApi: SiaphNoteddocumentsApi
  ) {
    this.receiptDate = this.formatDate();

    this.disposisiForm = this.fb.group({
      'selectto': ['TIM PEMBAHASAN RAPERWAL', Validators.compose([Validators.required])],
      'nodoc': ['', Validators.compose([Validators.required])],
      'receiptDate': [this.receiptDate, Validators.compose([Validators.required])],
      'noAgenda': ['', Validators.compose([Validators.required])],
      'subject': ['', Validators.compose([Validators.required])],
      'noted': ['', Validators.compose([Validators.required])],
    });

    this.storage.ready().then(() => {
      this.storage.get('siaphCredential').then((siaphCredential) => {
        this.storageData = siaphCredential;
        console.log(this.storageData, 'Storage');
        this.userName = this.storageData.username;
        this.idStorage = this.storageData.idUser;

        this.siaphDepthroleApi.findById(this.idStorage).subscribe((results) => {
          this.dataRole = results;
          this.roleName = this.dataRole.nameRole;
          console.log(this.roleName, 'Role');

          this.siaphDepthroleApi.find().subscribe((result) => {
            this.dataDepthRole = result;
            console.log(this.dataDepthRole, 'Data Role');
          })
        })
      });
    });
  }

  ionViewDidLoad() {

  }

  public funcCamera() {
    console.log('Ambil Kamera');
  }

  public submit() {

    const dataDoc = {
      noDoc: this.disposisiForm.controls.nodoc.value,
      fromDoc: this.idStorage,
      toDoc: this.disposisiForm.controls.selectto.value,
      dateDoc: this.receiptDate,
      noAgendaDoc: this.disposisiForm.controls.noAgenda.value,
      subjectDoc: this.disposisiForm.controls.subject.value,
      createDateDoc: this.formatDate(),
      publishedByDoc: this.userName
    };
    console.log(dataDoc, 'DataDoc');
    this.siaphDocumentsApi.create(dataDoc).subscribe((result) => {

      console.log(result);
      this.dataDoc = result;
      this.idDocument = this.dataDoc.idDoc;

      const dataDocTracking = {
        idDoc: this.idDocument,
        fromDoc: this.idStorage,
        toDoc: this.disposisiForm.controls.selectto.value,
        statusDisposisi: 'Open',
        prosesDate: this.formatDate(),
        editedDate: this.formatDate(),
        editedBy: this.userName
      };

      this.siaphTrackingdocumentsApi.create(dataDocTracking).subscribe((result) => {
        console.log(result);
        this.dataTracking = result;

        const dataNoteDoc = {
          idTracking: this.dataTracking.idTracking,
          idDoc: this.dataTracking.idDoc,
          dateNoted: this.formatDate(),
          notesDoc: this.disposisiForm.controls.noted.value,
        };

        this.siaphNoteddocumentsApi.create(dataNoteDoc).subscribe((result) => {
          let confirm = this.alertCtrl.create({
            message: 'Success Disposisi',
            buttons: [
              {
                text: 'Dismiss',
                handler: () => {
                  this.navCtrl.setRoot('DashboardTrackingPage', { tabSet: 'TRACKING' });
                }
              }
            ]
          });
          confirm.present();
        });
      })
    }, (error) => {
      let alert = this.alertCtrl.create({
        subTitle: 'Ups.. Sorry! please fill the blank column',
        buttons: ['Dismiss']
      });
      alert.present();
    })
  }

  public reset() {
    console.log('Reset');
  }

  public takePicture(isCamera): any {

    this.camera.getPicture({
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: isCamera ? this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: false,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      saveToPhotoAlbum: false,
      cameraDirection: 1
    }).then((imageData) => {

      const options: FileUploadOptions = {
        fileKey: 'file',
        fileName: isCamera ? this.idDocument + '_IMG_' + UUID.UUID() + imageData.substr(imageData.lastIndexOf('/') + 1) : this.idDocument + '_IMG_' + UUID.UUID() + '.jpg',
        chunkedMode: false,
        mimeType: 'image/jpg'
      };

      this.navCtrl.push('AttendancePreviewPage', { status: status, datetime: this.receiptDate, photo: imageData, imageData: imageData, options: options });

    }, (err) => {
      console.log(err);

      let alert = this.alertCtrl.create({
        subTitle: (err == 'Camera cancelled.') ? 'Camera cancelled.' : 'Camera cancelled.',
        buttons: [
          {
            text: 'Dismiss',
            handler: () => {
            }
          }]
      });
      alert.present();

    });

  }

  public formatDate() {
    this.CurrentDate = moment().format();
    return this.CurrentDate;
  }
}
