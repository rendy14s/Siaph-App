import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashboardTrackingPage } from './dashboard-tracking';

@NgModule({
  declarations: [
    DashboardTrackingPage,
  ],
  imports: [
    IonicPageModule.forChild(DashboardTrackingPage),
  ],
})
export class DashboardTrackingPageModule {}
