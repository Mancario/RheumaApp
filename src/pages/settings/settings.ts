import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { AuthService } from "../../security/auth.service";
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  language: string;
  months: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthService,
    private translate: TranslateService,
    private storage: Storage) {
    this.language = this.translate.currentLang;
    this.storage.get("graphMonths").then((val) => {
      this.months = val;
    }
    );

  }

  ionViewCanEnter(): boolean {
    return this.authService.isLoggedIn();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }
   
  changeGraphSetting(){
   
     this.storage.ready().then(() => {
      this.storage.set("graphMonths", this.months)
    })
  }

  changeLanguage() {
    this.translate.use(this.language);
  }  

}
