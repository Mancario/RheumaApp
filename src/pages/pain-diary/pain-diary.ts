import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { NewEntryPage } from '../new-entry/new-entry';


/*
  Generated class for the PainDiary page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-pain-diary',
  templateUrl: 'pain-diary.html'
})
export class PainDiaryPage {

  private painValue = 3;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PainDiaryPage');
  }

  navNewEntry(){
    this.navCtrl.setRoot(NewEntryPage);
  }

}
