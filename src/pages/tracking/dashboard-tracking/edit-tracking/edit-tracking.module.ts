import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditTrackingPage } from './edit-tracking';

@NgModule({
  declarations: [
    EditTrackingPage,
  ],
  imports: [
    IonicPageModule.forChild(EditTrackingPage),
  ],
})
export class EditTrackingPageModule {}
