import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PeopleDetailViewPage } from './people-detail-view';
import { RelativeTime } from '../../../pipe/relative-time';

@NgModule({
  declarations: [
    PeopleDetailViewPage,
    RelativeTime
  ],
  imports: [
    IonicPageModule.forChild(PeopleDetailViewPage),
  ],
})
export class PeopleDetailViewPageModule {}
