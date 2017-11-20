import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { SiaphUsercredentialApi } from './../../shared/sdk/services/custom/SiaphUsercredential';
import { Storage } from '@ionic/storage';
import { OneSignal } from '@ionic-native/onesignal';
import { md5 } from './../../assets/private/HashSalt';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',

  animations: [

    //For the logo
    trigger('flyInBottomSlow', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({ transform: 'translate3d(0,2000px,0' }),
        animate('2000ms ease-in-out')
      ])
    ]),

    //For the background detail
    trigger('flyInBottomFast', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({ transform: 'translate3d(0,2000px,0)' }),
        animate('1000ms ease-in-out')
      ])
    ]),

    //For the login form
    trigger('bounceInBottom', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        animate('2000ms 200ms ease-in', keyframes([
          style({ transform: 'translate3d(0,2000px,0)', offset: 0 }),
          style({ transform: 'translate3d(0,-20px,0)', offset: 0.9 }),
          style({ transform: 'translate3d(0,0,0)', offset: 1 })
        ]))
      ])
    ]),

    //For login button
    trigger('fadeIn', [
      state('in', style({
        opacity: 1
      })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate('1000ms 2000ms ease-in')
      ])
    ])
  ]
})
export class LoginPage {

  public username: any;
  public password: any;

  public dataLogin: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public SiaphuserCredentialApi: SiaphUsercredentialApi,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public storage: Storage,
    public onesignal: OneSignal
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public doLogin() {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    let saltHash = md5(this.password);

    this.SiaphuserCredentialApi.findOne({
      where: {
        and: [
          { username: this.username },
          { password: saltHash }
        ]
      }
    }).subscribe((loginDo) => {
      
      this.dataLogin = loginDo;
      console.log(this.dataLogin, 'DATALOGIN');
      this.storage.set('siaphCredential', this.dataLogin).then(() => {
        this.onesignal.sendTags({ 'userid': this.dataLogin.idUser });
        loading.dismiss();
        this.navCtrl.setRoot('DashboardTrackingPage', { tabSet: 'HOME' });
      });

    }, (error) => {
      loading.dismiss();
      let alert = this.alertCtrl.create({
        subTitle: 'Ups.. Sorry! the Username and Password may be wrong. Try Again..',
        buttons: ['Dismiss']
      });
      alert.present();
    });

  }

  public doCancel() {
    this.navCtrl.setRoot('TrackingPage');
  }

}
