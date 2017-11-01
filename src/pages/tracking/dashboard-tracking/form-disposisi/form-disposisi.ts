import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SiaphDocumentsApi } from './../../../../shared/sdk/services/custom/SiaphDocuments';
import { SiaphDepthroleApi } from './../../../../shared/sdk/services/custom/SiaphDepthrole';
import { Storage } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import { FileUploadOptions } from '@ionic-native/file-transfer';
import { UUID } from 'angular2-uuid';

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

  public dataDepthRole: any;
  public todays: any = new Date();
  public receiptDate: any = this.todays.toISOString();
  public selectfrom: any;
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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public siaphDocumentsApi: SiaphDocumentsApi,
    public storage: Storage,
    public siaphDepthroleApi: SiaphDepthroleApi,
    public alertCtrl: AlertController,
    public camera: Camera
  ) {

  }

  ionViewDidLoad() {
    this.storage.ready().then(() => {
      this.storage.get('siaphCredential').then((siaphCredential) => {
        this.storageData = siaphCredential;
        this.userName = this.storageData.username

        this.siaphDepthroleApi.find().subscribe((result)=> {
          this.dataDepthRole = result;
        })
      });
    });
  }

  public funcCamera() {
    console.log('Ambil Kamera');
  }

  public submit() {
    this.siaphDocumentsApi.create({
      noDoc: this.nodoc,
      fromDoc: this.selectfrom,
      toDoc: this.selectto,
      dateDoc: this.receiptDate,
      noAgendaDoc: this.noAgenda,
      subjectDoc: this.subject,
      notesDoc: this.noted,
      createDateDoc: this.todays.toISOString(),
      publishedByDoc: this.userName
    }).subscribe((result) => {

      console.log(result);
      this.dataDoc = result;
      this.idDocument = this.dataDoc.idDoc;


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
}
