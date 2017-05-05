import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
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
  isLoading = false

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public diaryService: DiaryService,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private translate: TranslateService) {

      this.getDiary();

      this.diaryService.updates$.subscribe(_ => this.getDiary())
     }

  ionViewCanEnter(): boolean {
    return this.authService.isLoggedIn();
    //return true;
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
                                console.log("I'm redirecting now")
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
    this.isLoading = true

    this.diaryService.refreshAllEntries()
      .subscribe(list => {
        if(list !== null){
          this.diaries = list.results

        }else{
          console.log("Did not refresh since app is offline")
          this.presentOfflineToast()
        }

        this.isLoading = false

      })
  }

  presentOfflineToast(){
    this.translate.get("error.offline").subscribe(networkMessage => {
      let toast = this.toastCtrl.create({
        message: networkMessage,
        duration: 2000,
        position: 'bottom'
      });
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
      toast.present()
    })
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

  getDiary() {
    this.paindiaries = this.diaryService.listEntries(this.query);
    this.paindiaries.forEach(element => {
      this.diaries = element.results;
    });
  }
}
