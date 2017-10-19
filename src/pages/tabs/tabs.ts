import { Component } from '@angular/core';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'DashboardTrackingPage';
  tab2Root = 'AccountTrackingPage';
  tab3Root = 'ListTrackingPage';
  tab4Root = 'ProfileAccountTrackingPage';

  constructor() {

  }
}
