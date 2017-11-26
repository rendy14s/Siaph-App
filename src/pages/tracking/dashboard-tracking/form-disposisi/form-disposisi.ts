import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { SiaphDocumentsApi } from './../../../../shared/sdk/services/custom/SiaphDocuments';
import { SiaphTrackingdocumentsApi } from './../../../../shared/sdk/services/custom/SiaphTrackingdocuments';
import { SiaphDepthroleApi } from './../../../../shared/sdk/services/custom/SiaphDepthrole';
import { SiaphNoteddocumentsApi } from './../../../../shared/sdk/services/custom/SiaphNoteddocuments';
import { SiaphDocumentslibraryApi } from './../../../../shared/sdk/services/custom/SiaphDocumentslibrary';
import { Storage } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import { UUID } from 'angular2-uuid';
import moment from 'moment';
import { FormBuilder, Validators } from '@angular/forms';
import { LoopBackConfig } from './../../../../shared/sdk/lb.config';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';


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
  public mine: any;
  public photoDataTemp: any;
  public fileName: string;
  
  public loadPub: any;
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
  public myDate: any;
  public youDate: any;


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
    public siaphNoteddocumentsApi: SiaphNoteddocumentsApi,
    private transfer: FileTransfer,
    public loadingCtrl: LoadingController,
    public siaphDocumentslibraryApi: SiaphDocumentslibraryApi
  ) {
    this.mine = this.navParams.get('mines');

    this.receiptDate = this.formatDate();

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
          

          this.siaphDepthroleApi.find({
            where: {
              depthCode: { nlike: this.mine} 
            }
          }).subscribe((result) => {
            this.dataDepthRole = result;
            console.log(this.dataDepthRole, 'Data Role');
          });
        });
      });
    });


    this.disposisiForm = this.fb.group({
      'selectto': ['TIM PEMBAHASAN RAPERWAL', Validators.compose([Validators.required])],
      'nodoc': ['', Validators.compose([Validators.required])],
      'receiptDate': [this.receiptDate, Validators.compose([Validators.required])],
      // 'noAgenda': ['', Validators.compose([Validators.required])],
      'subject': ['', Validators.compose([Validators.required])],
      'noted': ['', Validators.compose([Validators.required])],
    });
  }

  ionViewDidLoad() {

  }

  public funcCamera() {
    this.loadPub = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loadPub.present();
    this.camera.getPicture({
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      saveToPhotoAlbum: false,
      cameraDirection: 1
    }).then((imageData) => {

      this.photo = imageData;


      let options: FileUploadOptions = {
        fileKey: 'file',
        fileName: 'IMG_' + UUID.UUID() + this.photo.substr(this.photo.lastIndexOf('/') + 1),
        chunkedMode: false,
        mimeType: 'image/jpg'
      };

      this.fileName = options.fileName;
      this.photoDataTemp = this.photo;

      console.log(this.photoDataTemp, 'Push Poto');

      let fileTransfer: FileTransferObject = this.transfer.create();
      fileTransfer.upload(this.photo, LoopBackConfig.getPath() + '/api/SiaphContainers/Doc/upload', options)
        .then((data) => {
          this.loadPub.dismiss();
          console.log(data, 'Data Sukses')
          console.log('Sukses Upload Foto')
        });

    }, (err) => {
      console.log(err);
      this.loadPub.dismiss();

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

  public submit() {
    this.myDate = moment(this.myDate).add(1, 'seconds');
    this.youDate = new Date(this.myDate);
    const dataDoc = {
      noDoc: this.disposisiForm.controls.nodoc.value,
      fromDoc: this.idStorage,
      toDoc: this.disposisiForm.controls.selectto.value,
      dateDoc: this.receiptDate,
      // noAgendaDoc: this.disposisiForm.controls.noAgenda.value,
      subjectDoc: this.disposisiForm.controls.subject.value,
      createDateDoc: this.youDate,
      publishedByDoc: this.userName
    };
    console.log(dataDoc, 'DataDoc');
    this.siaphDocumentsApi.create(dataDoc).subscribe((result) => {

      console.log(result);
      this.dataDoc = result;
      this.idDocument = this.dataDoc.noDoc;

      const dataDocTracking = {
        idDoc: this.idDocument,
        fromDoc: this.idStorage,
        toDoc: this.disposisiForm.controls.selectto.value,
        statusDisposisi: 'Open',
        prosesDate: this.youDate,
        editedDate: this.youDate,
        editedBy: this.userName
      };

      this.siaphTrackingdocumentsApi.create(dataDocTracking).subscribe((result) => {
        console.log(result);
        this.dataTracking = result;

        const dataNoteDoc = {
          idTracking: this.dataTracking.idTracking,
          idDoc: this.dataTracking.idDoc,
          dateNoted: this.youDate,
          notesDoc: this.disposisiForm.controls.noted.value,
          fromNote: this.idStorage
        };

        this.siaphNoteddocumentsApi.create(dataNoteDoc).subscribe((result) => {

          const library = {
            idDoc: this.idDocument,
            namePhoto: this.fileName
          };

          this.siaphDocumentslibraryApi.create(library).subscribe((result) => {
            console.log('Sukses foto insert database');
          }, (error) => {
            console.log('Error Insert foto Database');
          });
          
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

  public formatDate() {
    this.CurrentDate = moment().format();
    return this.CurrentDate;
  }
}
