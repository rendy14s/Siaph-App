import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  public todays: any = new Date();
  public receiptDate: any = this.todays.toISOString();
  public selecttype: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormDisposisiPage');
  }

}
