import { RelativeTimePipeModule } from '../../../pipe/relative-time.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PeopleDetailViewPage } from './people-detail-view';


@NgModule({
  declarations: [
    PeopleDetailViewPage
  ],
  imports: [
    IonicPageModule.forChild(PeopleDetailViewPage),
    RelativeTimePipeModule
  ],
})
export class PeopleDetailViewPageModule {}
