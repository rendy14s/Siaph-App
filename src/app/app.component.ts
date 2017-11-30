import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal } from '@ionic-native/onesignal';


/**
 * Native Plugin
 */
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = 'HomePage';

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private oneSignal: OneSignal,
    public screenOrientation: ScreenOrientation,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.initOnesignal();
      }

      // Logic about Phone Screen Orientation Lock and Tablet no Lock
      if (this.platform.is('cordova')) {
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      }

      if (this.platform.is('cordova') && (this.platform.is('tablet') || this.platform.is('phablet'))) {
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      }

      setTimeout(() => {
        // console.log('cordova', this.platform.is('cordova'));
        // console.log('tablet', this.platform.is('tablet'));
        // console.log('phablet', this.platform.is('phablet'));

        if (this.platform.is('cordova') && (this.platform.is('tablet') || this.platform.is('phablet'))) {
          this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
        }

      }, 3000)

      setTimeout(() => {
        // console.log('cordova', this.platform.is('cordova'));
        // console.log('tablet', this.platform.is('tablet'));
        // console.log('phablet', this.platform.is('phablet'));

        if (this.platform.is('cordova') && (this.platform.is('tablet') || this.platform.is('phablet'))) {
          this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
        }

      }, 5000)

      setTimeout(() => {
        // console.log('cordova', this.platform.is('cordova'));
        // console.log('tablet', this.platform.is('tablet'));
        // console.log('phablet', this.platform.is('phablet'));

        if (this.platform.is('cordova') && (this.platform.is('tablet') || this.platform.is('phablet'))) {
          this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
        }

      }, 10000)


    });
  }

  initOnesignal() {

    this.oneSignal.startInit('dba6c690-57d4-43e6-b894-7da32a5d9357', '246725496855');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

    this.oneSignal.handleNotificationReceived().subscribe(data => { });

    this.oneSignal.handleNotificationOpened().subscribe(result => {

    });
    this.oneSignal.endInit();
  }
}

