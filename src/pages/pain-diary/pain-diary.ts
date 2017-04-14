import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from "../../security/auth.service";
import { LogoutPage } from '../logout/logout';
import { NewEntryPage } from '../new-entry/new-entry';
import { Observable } from 'rxjs/Observable';
import { DiaryService, DiaryQuery, DiaryEntryList, DiaryEntry } from "./pain-diary-service"


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
  query: DiaryQuery = { offset: 0, count: 10 };
  paindiaries: Observable<DiaryEntryList>;
  diaries: DiaryEntry[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private authService: AuthService, private diaryService: DiaryService) {
      this.getDiary(); 
     }

  ionViewCanEnter(): boolean {
    return this.authService.isLoggedIn();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PainDiaryPage');
  }

  navNewEntry() {
    this.navCtrl.setRoot(NewEntryPage)
      .catch(() => this.navCtrl.setRoot(LogoutPage))
  }

  getDiary() {
    this.paindiaries = this.diaryService.listEntries(this.query);
    this.paindiaries.forEach(element => {
      this.diaries = element.results;       
    }); 
  }
}
