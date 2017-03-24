import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';

import { ForgottenPasswordPage } from '../forgotten-password/forgotten-password';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';


/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  /*

  */
  login(){
    this.navCtrl.setRoot(HomePage);
  }

  navForgotten(){
    this.navCtrl.setRoot(ForgottenPasswordPage);

  }

  navSignup(){
    this.navCtrl.setRoot(SignupPage);
  }

}
