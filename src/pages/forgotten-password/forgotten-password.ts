import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';


/*
  Generated class for the ForgottenPassword page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-forgotten-password',
  templateUrl: 'forgotten-password.html'
})
export class ForgottenPasswordPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgottenPasswordPage');
  }

  reset(){
    this.navCtrl.setRoot(LoginPage);
  }

  back(){
    this.navCtrl.setRoot(LoginPage);
  }

}
