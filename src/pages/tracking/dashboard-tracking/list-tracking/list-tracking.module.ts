import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListTrackingPage } from './list-tracking';

@NgModule({
  declarations: [
    ListTrackingPage,
  ],
  imports: [
    IonicPageModule.forChild(ListTrackingPage),
  ],
})
export class ListTrackingPageModule {}
