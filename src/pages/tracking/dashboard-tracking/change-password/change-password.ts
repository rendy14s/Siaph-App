import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { SiaphUsercredentialApi } from './../../../../shared/sdk/services/custom/SiaphUsercredential';
import { md5 } from './../../../../assets/private/HashSalt';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ChangePasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  public storageData: any;
  public idUser: any;

  public currPass: any;
  public newPass: any;
  public repass: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public siaphUsercredentialApi: SiaphUsercredentialApi,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public storage: Storage
  ) {

  }

  ionViewDidLoad() {
    this.storageData = this.navParams.get('dataStorage');
    console.log(this.storageData, 'Data Storage');

    this.idUser = this.storageData.idUser;
  }

  public submit() {
    const loading = this.loadingCtrl.create({
      content: 'Update...'
    });

    loading.present();

    console.log('Submit');
    // let curr = md5(this.currPass);
    let passNew = md5(this.newPass);
    let re = md5(this.repass);

    if (passNew != re) {
      let alert = this.alertCtrl.create({
        subTitle: 'Your password not same, please check re-type and new password!',
        buttons: ['Dismiss']
      });
      alert.present();
    } else {
      this.siaphUsercredentialApi.updateAll(
        { idUser: this.idUser },
        { password: passNew }
      ).subscribe((result) => {
        console.log(result);

        loading.dismiss();

        let alert = this.alertCtrl.create({
          message: 'Your password has been update, please re login!',
          buttons: [
            {
              text: 'Dimiss',
              handler: () => {
                // this.oneSignal.deleteTags(['userid']);
                this.storage.clear();
                window.localStorage.clear();
                this.navCtrl.setRoot('HomePage');
              }
            }
          ]
        });
        alert.present();
      }, (error) => {
        loading.dismiss();
        let alert = this.alertCtrl.create({
          subTitle: 'Error! Check your conenction and try again',
          buttons: ['Dismiss']
        });
        alert.present();
        console.log(error);
      });
    }
  }

  public cancel() {
    console.log('Cancel');
    this.viewCtrl.dismiss();
  }

}
