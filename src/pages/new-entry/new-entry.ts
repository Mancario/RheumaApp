import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from "../../security/auth.service";
import { LogoutPage } from '../logout/logout';
import { PainDiaryPage} from '../pain-diary/pain-diary';
import { DiaryService, DiaryEntry } from "../pain-diary/pain-diary-service";


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
  private dateChosen;
  private painValue;
  private diseaseValue;
  private fatigueValue;
  private prednisoloneDose;
  private additionalDrugs;
  private tenderJoints;
  private comments;
  private date = {
    today: new Date().toISOString().substr(0, 10)
  }


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private authService: AuthService, private diaryService: DiaryService) {
  }

  ionViewCanEnter(): boolean{
    return this.authService.isLoggedIn();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewEntryPage');

    let entryToEdit = this.diaryService.hasDiaryEntryToEdit();
    if(entryToEdit){
      this.populateEntry(entryToEdit);

    }else{
      this.dateChosen = this.date.today;
    }
  }

  cancel(){
    this.diaryService.setDiaryEntryToEdit(null);
    this.navCtrl.setRoot(PainDiaryPage)
      .catch(() => this.navCtrl.setRoot(LogoutPage))
  }

  submit(){
    this.diaryService.setDiaryEntryToEdit(null);
    console.log("Called submit step 1");
    let entry = {
      date: this.dateChosen,
      pain: this.painValue,
      diseaseActivity: this.diseaseValue,
      fatigue: this.fatigueValue,
      prednisoloneDose: this.prednisoloneDose,
      additionalDrugs: this.additionalDrugs,
      tenderJoints: this.tenderJoints,
      comments: this.comments,
      deleted: false
    }

    this.diaryService.saveEntry(entry)
      .subscribe(
        res =>{
          if(res){
            this.navCtrl.setRoot(PainDiaryPage)
              .catch(() => this.navCtrl.setRoot(LogoutPage))
          }else{

          }
        },
        err => console.log("Error saving entry")
      );

  }

  populateEntry(entry: DiaryEntry){
    this.dateChosen = entry.date;
    this.painValue = entry.pain;
    this.diseaseValue = entry.diseaseActivity;
    this.fatigueValue = entry.fatigue;
    this.prednisoloneDose = entry.prednisoloneDose;
    this.additionalDrugs = entry.additionalDrugs;
    this.tenderJoints = entry.tenderJoints;
    this.comments = entry.comments;

    let el = document.getElementById("dateButton");
    el.setAttribute("disabled", "true");

  }

}
