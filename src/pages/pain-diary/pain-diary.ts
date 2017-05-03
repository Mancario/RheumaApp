import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthService } from "../../security/auth.service";
import { LogoutPage } from '../logout/logout';
import { NewEntryPage } from '../new-entry/new-entry';
import { Observable } from 'rxjs/Observable';
import { DiaryService, DiaryQuery, DiaryEntryList, DiaryEntry } from "./pain-diary-service";
import { TranslateService } from '@ngx-translate/core';


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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public diaryService: DiaryService,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private translate: TranslateService) {

      this.getDiary();
     }

  ionViewCanEnter(): boolean {
    //return this.authService.isLoggedIn();
    return true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PainDiaryPage');
  }

  navNewEntry() {
    this.navCtrl.setRoot(NewEntryPage)
      .catch(() => this.navCtrl.setRoot(LogoutPage))
  }

  deleteEntry(entry: DiaryEntry){
    this.translate.get('pain.confirmDel').subscribe(deleteTitle => {
        this.translate.get('pain.deleteMess').subscribe(deleteMessage => {
            this.translate.get('button.cancel').subscribe(cancelBtn => {
                this.translate.get('button.delete').subscribe(deleteBtn => {
                    let alert = this.alertCtrl.create({
                      title: deleteTitle,
                      message: deleteMessage + entry.date + "?",
                      buttons: [
                        {text: cancelBtn, role: 'cancel', handler: () => {}},
                        {text: deleteBtn, handler: () => {
                            console.log('Delete clicked');
                            this.diaryService.deleteEntry(entry.date).subscribe(res => {
                              if(res){
                                this.navCtrl.setRoot(this.navCtrl.getActive().component);
                              }
                            },
                            err => console.log("Error deleting entry")
                            );
                          }
                        }
                      ]
                    });
                    alert.present();
                  }
                );
              }
            );
          }
        );
      }
    );
  }

  forceUpdate(){
    this.diaryService.refreshAllEntries()
      .subscribe(list => this.diaries = list.results)
  }

  editEntry(entry: DiaryEntry){
    this.diaryService.setDiaryEntryToEdit(entry);
    this.navCtrl.setRoot(NewEntryPage)
      .catch(() => this.navCtrl.setRoot(LogoutPage))
  }


  extendEntry(entry){
    let info = document.getElementById(entry.date);
    if(entry.toggleExtend){
      console.log("Extend entry: " + entry.date);
      info.style.display = 'block';

    }else{
      console.log("Compress entry: " + entry.date);
      info.style.display = 'none';
    }

  }

/*
  extendEntry(entry){
    let info = document.getElementById(entry.date);
    let exp = document.getElementById("extendbutton");
    let comp = document.getElementById("compressbutton");

    if(info.style.display === 'none'){
      console.log("Extend entry: " + entry.date);
      info.style.display = 'block';
      exp.style.display = 'none';
      comp.style.display = 'block'

    }else{
      console.log("Compress entry: " + entry.date);
      info.style.display = 'none';
      exp.style.display = 'block';
      comp.style.display = 'none'
    }

  }
*/

  getDiary() {
    this.paindiaries = this.diaryService.listEntries(this.query);
    this.paindiaries.forEach(element => {
      this.diaries = element.results;
    });
  }
}
