import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EHaqNewEntryPage } from '../e-haq-new-entry/e-haq-new-entry';
import { AuthService } from "../../security/auth.service";

/*
  Generated class for the EHAQ page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-e-haq',
  templateUrl: 'e-haq.html'
})
export class EHAQPage {
   private painValue = 3;

   diaries: Array<{date: string, value: string, painValue: number}>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private authService: AuthService) {

this.diaries = [
      {date: "03.03.17", value: "1,2", painValue: 12},
      {date: "02.03.17", value: "0,3", painValue: 3},
      {date: "01.03.17", value: "1,7", painValue: 17}
    ];
  }

  ionViewCanEnter(): boolean{
    return this.authService.isLoggedIn();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EHAQPage');
  }

   navNewEntry(){
   this.navCtrl.setRoot(EHaqNewEntryPage)
    .catch(() => this.authService.logout())
  }

}
