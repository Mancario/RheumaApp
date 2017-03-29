import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {MdlTextFieldComponent, MdlDialogReference} from "angular2-mdl";
import {Router} from "@angular/router";
import {AuthService} from "../../security/auth.service";

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

  public loading: boolean = false;
  public errorMessage: string = null;
  public form: FormGroup;
  public username = "";
  public password = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private _authService: AuthService) {
/*
      private _authService = AuthService;
      private _router = Router;
      private fb = FormBuilder;
*/

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  /*

  */
  login(){
    this.errorMessage = null;
    this.loading = true;

    this._authService.login(this.username, this.password)
        .subscribe(
            res => {
                if (res) {
                    this.navCtrl.setRoot(HomePage);
                }
                //this.setError("Fehler: Benutzername oder Passwort falsch.");
                //this.inputElement.setFocus();
            },
            //err => this.setError("Serverfehler beim Einloggen: " + err)
          );

    //this.navCtrl.setRoot(HomePage);

  }

  navForgotten(){
    this.navCtrl.setRoot(ForgottenPasswordPage);

  }

  navSignup(){
    this.navCtrl.setRoot(SignupPage);
  }

}
