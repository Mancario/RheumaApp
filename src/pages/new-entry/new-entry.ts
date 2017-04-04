import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from "../../security/auth.service";


import { PainDiaryPage} from '../pain-diary/pain-diary'

/*
  Generated class for the NewEntry page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-new-entry',
  templateUrl: 'new-entry.html'
})
export class NewEntryPage {
  private painValue = 0;
  private diseaseValue = 0;
  private fatigueValue = 0;

  public date = {
  today: '2017-03-28'
  }


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private authService: AuthService) {
    //this.date.today = new Date();
  }

  ionViewCanEnter(): boolean{
    return this.authService.isLoggedIn();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewEntryPage');
  }

  cancel(){
    this.navCtrl.setRoot(PainDiaryPage);
  }

  submit(){
    this.navCtrl.setRoot(PainDiaryPage);

  }

}
