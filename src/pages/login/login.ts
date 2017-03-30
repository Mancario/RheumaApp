import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
//import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {AuthService} from "../../security/auth.service";

//import { ForgottenPasswordPage } from '../forgotten-password/forgotten-password';
//import { SignupPage } from '../signup/signup';
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

  public loading: boolean = false;
  public errorMessage: string = "";
  //public form: FormGroup;
  public username = "";
  public password = "";


  constructor(public navCtrl: NavController, public navParams: NavParams, private _authService: AuthService) {
    //this.inputElement.setFocus();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  /*

  */
  login(){
    this.errorMessage = "";
    this.loading = true;

    this._authService.login(this.username, this.password)
        .subscribe(
            res => {
                if (res) {
                    this.navCtrl.setRoot(HomePage);
                }
                this.setError("Wrong username or password");
            },
            err => this.setError("Server error logging in: " + err)
          );
  }

  navForgotten(){
    //this.navCtrl.setRoot(ForgottenPasswordPage);
    window.location.href = "http://www.rheuma-online.de/forum/login.php?do=lostpw";

  }

  navSignup(){
    //this.navCtrl.setRoot(SignupPage);
    window.location.href = "http://www.rheuma-online.de/forum/register.php";

  }

  private setError(error: string): void {
      this.loading = false;
      this.errorMessage = error;
  }

}
