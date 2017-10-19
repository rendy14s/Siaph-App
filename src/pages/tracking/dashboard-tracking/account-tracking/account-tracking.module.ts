import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountTrackingPage } from './account-tracking';

@NgModule({
  declarations: [
    AccountTrackingPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountTrackingPage),
  ],
})
export class AccountTrackingPageModule {}
