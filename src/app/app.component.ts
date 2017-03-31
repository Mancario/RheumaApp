import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { BloodTestPage } from '../pages/blood-test/blood-test';
import { EDASPage } from '../pages/e-das/e-das';
import { EHAQPage } from '../pages/e-haq/e-haq';
import { EHaqNewEntryPage } from '../pages/e-haq-new-entry/e-haq-new-entry';
import { GenerateReportPage } from '../pages/generate-report/generate-report';
import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';
import { NewEntryPage } from '../pages/new-entry/new-entry';
import { PainDiaryPage } from '../pages/pain-diary/pain-diary';
import { SettingsPage } from '../pages/settings/settings';
import { UserGuidePage } from '../pages/user-guide/user-guide';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{icon: string, title: string, component: any}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      {icon: "home",  title: 'Home', component: HomePage },
      {icon: "print", title: 'Generate Report', component: GenerateReportPage },
      { icon: "pulse",title: 'Pain Diary', component: PainDiaryPage },
      { icon: "man",title: 'eHAQ', component: EHAQPage },
      { icon: "body",title: 'eDAS', component: EDASPage },
      { icon: "medkit",title: 'Blood Test', component: BloodTestPage },
      { icon: "help-circle",title: 'User Guide', component: UserGuidePage },
      { icon: "settings",title: 'Settings', component: SettingsPage },
      { icon: "exit",title: 'Log Out', component: LogoutPage }

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
