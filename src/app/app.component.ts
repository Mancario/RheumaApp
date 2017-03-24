import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { BloodTestPage } from '../pages/blood-test/blood-test';
import { EDASPage } from '../pages/e-das/e-das';
import { EHAQPage } from '../pages/e-haq/e-haq';
import { GenerateReportPage } from '../pages/generate-report/generate-report';
import { LoginPage } from '../pages/login/login';
import { NewEntryPage } from '../pages/new-entry/new-entry';
import { PainDiaryPage } from '../pages/pain-diary/pain-diary';
import { SettingsPage } from '../pages/settings/settings';
import { UserGuidePage } from '../pages/user-guide/user-guide';
import { Page2 } from '../pages/page2/page2';

import { ForgottenPasswordPage } from '../pages/forgotten-password/forgotten-password';
import { SignupPage } from '../pages/signup/signup';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = ForgottenPasswordPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Generate Report', component: GenerateReportPage },
      { title: 'Pain Diary', component: PainDiaryPage },
      { title: 'eHAQ', component: EHAQPage },
      { title: 'eDAS', component: EDASPage },
      { title: 'Blood Test', component: BloodTestPage },
      { title: 'User Guide', component: UserGuidePage },
      { title: 'Settings', component: SettingsPage },
      { title: 'Page Two', component: Page2 }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
