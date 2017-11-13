import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

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

  public currPass: any;
  public newPass: any;
  public repass: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
  
  }

  ionViewDidLoad() {
    this.storageData = this.navParams.get('dataStorage');
    console.log(this.storageData, 'Data Storage');
  }

  public submit() {
    console.log('Submit');
  }

  public cancel() {
    console.log('Cancel');
    this.viewCtrl.dismiss();
  }

}
