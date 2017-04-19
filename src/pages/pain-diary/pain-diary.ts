import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from "../../security/auth.service";
import { LogoutPage } from '../logout/logout';
import { NewEntryPage } from '../new-entry/new-entry';
import { Observable } from 'rxjs/Observable';
import { DiaryService, DiaryQuery, DiaryEntryList, DiaryEntry } from "./pain-diary-service";
import { AlertController } from 'ionic-angular';


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
  toggleExtend: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private authService: AuthService, private diaryService: DiaryService,
    private alertCtrl: AlertController) {
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

  deleteEntry(entry: DiaryEntry){
    console.log("Called deleteEntry step 1");


    let alert = this.alertCtrl.create({
    title: 'Confirm delete',
    message: 'Do you want to delete pain entry for date: ' + entry.date + "?",
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Delete',
        handler: () => {
          console.log('Delete clicked');
          this.diaryService.deleteEntry(entry)
            .subscribe(
              res =>{
                if(res){
                  this.navCtrl.setRoot(this);
                }else{

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

  editEntry(entry: DiaryEntry){
    // not implemented yet.
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
