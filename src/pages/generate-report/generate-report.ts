import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from "../../security/auth.service";


/*
  Generated class for the GenerateReport page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-generate-report',
  templateUrl: 'generate-report.html'
})
export class GenerateReportPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private authService: AuthService) {}

  ionViewCanEnter(): boolean{
    return this.authService.isLoggedIn();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GenerateReportPage');
  }

}
