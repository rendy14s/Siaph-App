import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailTrackingPage } from './detail-tracking';
import { RelativeTime } from '../../../../pipe/relative-time';
@NgModule({
  declarations: [
    DetailTrackingPage,
    RelativeTime
  ],
  imports: [
    IonicPageModule.forChild(DetailTrackingPage),
  ],
})
export class DetailTrackingPageModule {}
