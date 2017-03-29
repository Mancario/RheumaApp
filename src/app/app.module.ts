import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ChartsModule } from 'ng2-charts';

import { HomePage } from '../pages/home/home';
import { BloodTestPage } from '../pages/blood-test/blood-test';
import { EDASPage } from '../pages/e-das/e-das';
import { EHAQPage } from '../pages/e-haq/e-haq';
import { ForgottenPasswordPage } from '../pages/forgotten-password/forgotten-password';
import { GenerateReportPage } from '../pages/generate-report/generate-report';
import { LoginPage } from '../pages/login/login';
import { NewEntryPage } from '../pages/new-entry/new-entry';
import { PainDiaryPage } from '../pages/pain-diary/pain-diary';
import { SettingsPage } from '../pages/settings/settings';
import { SignupPage } from '../pages/signup/signup';
import { UserGuidePage } from '../pages/user-guide/user-guide';
import { AuthService } from '../security/auth.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BloodTestPage,
    EDASPage,
    ForgottenPasswordPage,
    EHAQPage,
    GenerateReportPage,
    LoginPage,
    NewEntryPage,
    PainDiaryPage,
    SettingsPage,
    SignupPage,
    UserGuidePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BloodTestPage,
    EDASPage,
    ForgottenPasswordPage,
    EHAQPage,
    GenerateReportPage,
    LoginPage,
    NewEntryPage,
    PainDiaryPage,
    SettingsPage,
    SignupPage,
    UserGuidePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthService]
})
export class AppModule {}
