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
import { AuthService } from '../security/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable }     from 'rxjs/Observable';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  private home;
  private report;
  private pain;
  private haq;
  private das;
  private blood;
  private guide;
  private settings;
  private logOut;



  pages: Array<{icon: string, title: string, component: any}>;

  constructor(public platform: Platform, private _authService: AuthService,
    private translate: TranslateService) {
    this.initializeApp();

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('no');
    //translate.use('no');

    this.setTitles().subscribe(
      value =>{
        this.pages = [
          { icon: "home",  title: this.home, component: HomePage },
          { icon: "print", title: this.report, component: GenerateReportPage },
          { icon: "pulse",title: this.pain, component: PainDiaryPage },
          { icon: "man",title: this.haq, component: EHAQPage },
          { icon: "body",title: this.das, component: EDASPage },
          { icon: "medkit",title: this.blood, component: BloodTestPage },
          { icon: "help-circle",title: this.guide, component: UserGuidePage },
          { icon: "settings",title: this.settings, component: SettingsPage },
          { icon: "exit",title: this.logOut, component: LogoutPage }

        ];
      }
    );
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  setTitles(): Observable<string|Object>{
    this.translate.get('menu.home').subscribe(
      value => this.home = value
    );

    this.translate.get('menu.report').subscribe(
      value => this.report = value
    );

    this.translate.get('menu.pain').subscribe(
      value => this.pain = value
    );

    this.translate.get('menu.haq').subscribe(
      value => this.haq = value
    );

    this.translate.get('menu.das').subscribe(
      value => this.das = value
    );

    this.translate.get('menu.blood').subscribe(
      value => this.blood = value
    );

    this.translate.get('menu.guide').subscribe(
      value => this.guide = value
    );

    this.translate.get('menu.settings').subscribe(
      value => this.settings = value
    );

    this.translate.get('menu.logOut').subscribe(
      value => {
        this.logOut = value
      }
    );

    return this.translate.get('menu.logOut');
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component)
      .catch(() => this.nav.setRoot(LogoutPage))
  }
}
