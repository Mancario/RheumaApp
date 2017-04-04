import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from "../../security/auth.service";


/*
  Generated class for the EHaqNewEntry page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-e-haq-new-entry',
  templateUrl: 'e-haq-new-entry.html'
})
export class EHaqNewEntryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private authService: AuthService) {}

  ionViewCanEnter(): boolean{
    return this.authService.isLoggedIn();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EHaqNewEntryPage');
  }

}
