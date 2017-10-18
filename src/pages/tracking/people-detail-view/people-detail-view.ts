import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

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

  public tracking: any = 'detail';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PeopleDetailViewPage');
  }

  public exit() {
    this.viewCtrl.dismiss();
  }
}
