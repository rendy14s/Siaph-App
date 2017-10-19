import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileAccountTrackingPage } from './profile-account-tracking';

@NgModule({
  declarations: [
    ProfileAccountTrackingPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileAccountTrackingPage),
  ],
})
export class ProfileAccountTrackingPageModule {}
