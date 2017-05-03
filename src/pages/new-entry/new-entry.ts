import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AuthService } from "../../security/auth.service";
import { LogoutPage } from '../logout/logout';
import { PainDiaryPage} from '../pain-diary/pain-diary';
import { DiaryService, DiaryEntry } from "../pain-diary/pain-diary-service";
import { TranslateService } from '@ngx-translate/core';


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


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private authService: AuthService,
    private diaryService: DiaryService,
    private alertCtrl: AlertController,
    private translate: TranslateService) {
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

  ionViewDidLeave() {
    this.diaryService.setDiaryEntryToEdit(null)
  }

  cancel(){
    this.diaryService.setDiaryEntryToEdit(null);
    this.navCtrl.setRoot(PainDiaryPage)
      //.catch(() => this.navCtrl.setRoot(LogoutPage))
  }

  submit(){
    if(this.diaryService.hasDiaryEntryToEdit()){
      this.diaryService.setDiaryEntryToEdit(null);
      // User does not need to confirm override
      this.saveEntry();

    }else{
      // Checks if there is an entry for this date already
      this.diaryService.viewEntry(this.dateChosen)
      .subscribe(
        res =>{

          // Ask if user wants to override - if so: override.
          if(res){ // If existing entry is undeleted
            this.translate.get('pain.confirmOver').subscribe(
              overrideTitle => {
                this.translate.get('pain.overrideMess').subscribe(
                  overrideMessage => {
                    this.translate.get('button.cancel').subscribe(
                      cancelBtn => {
                        this.translate.get('button.override').subscribe(
                          overrideBtn => {
                            let alert = this.alertCtrl.create({
                            title: overrideTitle,
                            message: overrideMessage + this.dateChosen + "?",
                            buttons: [
                              {
                                text: cancelBtn,
                                role: 'cancel',
                                handler: () => {
                                  console.log('Cancel clicked');
                                }
                              },
                              {
                                text: overrideBtn,
                                handler: () => {
                                  console.log('Override clicked');
                                  this.saveEntry();
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

          }else{ // No existing entry
            this.saveEntry();
          }

        },
        err => {
          console.log("Could not find previous entry")

        }
      );
    }
  }

  saveEntry(){
    let entry = this.getEntry()

    if(this.isValidEntry(entry)){
      this.diaryService.addEntry(entry)
        .subscribe(
          res =>{
            console.log("New entry returned:", res)
            if(res){
              this.displaySavedToast()
              this.navCtrl.setRoot(PainDiaryPage)
                .catch(() => this.navCtrl.setRoot(LogoutPage))
            }else{

            }
          },
          err => this.displayErrorSavingToast()
        );

    }else{
      this.displayUnvalidEntryToast()
    }

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

  getEntry(): DiaryEntry{
    let entry = {
      date: this.dateChosen,
      pain: this.painValue,
      diseaseActivity: this.diseaseValue,
      fatigue: this.fatigueValue,
      prednisoloneDose: this.prednisoloneDose,
      additionalDrugs: this.additionalDrugs,
      tenderJoints: this.tenderJoints,
      comments: this.comments,
      deleted: false,
      lastModified: new Date().getTime()
    }

    return entry;
  }

  isValidEntry(entry: DiaryEntry): boolean{
    let valid = (
      entry.pain ||
      entry.diseaseActivity ||
      entry.fatigue ||
      entry.prednisoloneDose ||
      entry.additionalDrugs ||
      entry.tenderJoints ||
      entry.comments
    ) != null

    return valid
  }

  displaySavedToast(){
    this.translate.get("pain.saved").subscribe(savedMessage => {
      let toast = this.toastCtrl.create({
        message: savedMessage,
        duration: 2000,
        position: 'bottom'
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      toast.present();
    })
  }

  displayErrorSavingToast(){
    this.translate.get("error.storage").subscribe(errorMessage => {
      let toast = this.toastCtrl.create({
        message: errorMessage,
        duration: 3000,
        position: 'top'
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      toast.present();
    })
  }

  displayUnvalidEntryToast(){
    this.translate.get("error.unvalid").subscribe(errorMessage => {
      let toast = this.toastCtrl.create({
        message: errorMessage,
        duration: 3000,
        position: 'bottom'
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      toast.present();
    })
  }


}
