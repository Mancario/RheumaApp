import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import 'chart.js';
import { HomePage } from '../pages/home/home';
import { BloodTestPage } from '../pages/blood-test/blood-test';
import { EDASPage } from '../pages/e-das/e-das';
import { EHAQPage } from '../pages/e-haq/e-haq';
import { HAQService } from '../pages/e-haq/e-haq-service';
import { DiaryService } from '../pages/pain-diary/pain-diary-service';
import { EHaqNewEntryPage } from '../pages/e-haq-new-entry/e-haq-new-entry';
import { ForgottenPasswordPage } from '../pages/forgotten-password/forgotten-password';
import { GenerateReportPage } from '../pages/generate-report/generate-report';
import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';
import { NewEntryPage } from '../pages/new-entry/new-entry';
import { PainDiaryPage } from '../pages/pain-diary/pain-diary';
import { SettingsPage } from '../pages/settings/settings';
import { SignupPage } from '../pages/signup/signup';
import { UserGuidePage } from '../pages/user-guide/user-guide';
import { AuthService } from '../security/auth.service';
import { LocalStorageService } from '../security/local-storage.service';
import { StoreCredentialsService } from '../security/store-credentials.service';
import { IonicStorageModule } from '@ionic/storage';
import { HaqifyPipe } from '../pages/e-haq-new-entry/haqify.pipe'
import { HaqAnswerForm } from "../pages/e-haq-new-entry/e-haq-new-entry-form"
import { Http } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { SecureStorage } from "@ionic-native/secure-storage";
import { NativeStorage } from "@ionic-native/native-storage";
import { NetworkService } from '../services/network.service'
import { Network } from '@ionic-native/network';


export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    LogoutPage,
    NewEntryPage,
    PainDiaryPage,
    SettingsPage,
    SignupPage,
    UserGuidePage,
    EHaqNewEntryPage,
    HaqifyPipe
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    ChartsModule,
    FormsModule,
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
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
    LogoutPage,
    NewEntryPage,
    PainDiaryPage,
    SettingsPage,
    SignupPage,
    UserGuidePage,
    EHaqNewEntryPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
    StatusBar,
    SplashScreen,
    SecureStorage,
    NativeStorage,
    AuthService,
    LocalStorageService,
    StoreCredentialsService,
    HAQService,
    DiaryService,
    HaqAnswerForm,
    Network, // Ionic service
    NetworkService // Our service

  ]
})
export class AppModule {}
