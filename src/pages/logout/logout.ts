import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { AuthService} from "../../security/auth.service";
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html'
})
export class LogoutPage {

  constructor(public navCtrl: NavController,
    private _authService: AuthService) {

      this._authService.logout();
      this.navCtrl.setRoot(LoginPage);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
  }

}
