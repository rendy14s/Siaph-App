import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SiaphTrackingdocumentsApi } from './../../../../shared/sdk/services/custom/SiaphTrackingdocuments';
import { Storage } from '@ionic/storage';
import { SiaphDepthroleApi } from './../../../../shared/sdk/services/custom/SiaphDepthrole';
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

  @ViewChild('mySlider') mySlider: any;

  public idDoc: any;
  public dataTracking: any;
  public dataTrackingLength: any;
  public dynamicData: any = [];
  public dataTemp: any = [];

  public arrayLength: any;
  public showCss: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public siaphTrackingdocumentsApi: SiaphTrackingdocumentsApi,
    public storage: Storage,
    public siaphDepthroleApi: SiaphDepthroleApi
  ) {
    setTimeout(() => {
      this.goToSlide();
    }, 500);
  }

  goToSlide() {
    this.mySlider.slideTo(this.arrayLength, 500);
  }

  ionViewDidLoad() {
    this.idDoc = this.navParams.get('idDoc');
    this.siaphTrackingdocumentsApi.find({
      where: {
        idDoc: this.idDoc
      }
    }).subscribe(result1 => {
      this.dataTracking = result1;
      this.dataTrackingLength = this.dataTracking.length;

      this.siaphDepthroleApi.find({
        where: {
          idRole: this.dataTracking[0]['fromDoc']
        }
      }).subscribe((result2) => {
        result2['RoleFrom'] = result2[0]['nameRole'];
        this.dataTemp = result2;

        for (let i = 0; i < this.dataTrackingLength; i++) {
          this.siaphDepthroleApi.find({
            where: {
              idRole: this.dataTracking[i].toDoc
            }
          }).subscribe((result3) => {
            this.dynamicData[i] = result3[0]['nameRole'];
            this.arrayLength = this.dynamicData.length - 1;
          });
        }
      });
    });
  }

}
