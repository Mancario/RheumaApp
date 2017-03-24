import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PainDiaryPage } from '../pain-diary/pain-diary';
import { GenerateReportPage } from '../generate-report/generate-report';

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  painDiary(){
    this.navCtrl.setRoot(PainDiaryPage);
  }

  generateReport(){
    this.navCtrl.setRoot(GenerateReportPage);

  }
}
