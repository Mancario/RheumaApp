import { Component, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from "../../security/auth.service";
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular';
import { EHAQPage } from "../e-haq/e-haq"
import { LogoutPage } from '../logout/logout';
import { HAQEntry, HAQService, HAQPage, HAQCategory, HAQQuestion, HAQEntryAnswer } from "../e-haq/e-haq-service"
import { HaqAnswerForm } from "./e-haq-new-entry-form"
/*
  Generated class for the EHaqNewEntry page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-e-haq-new-entry',
  templateUrl: 'e-haq-new-entry.html'
})
export class EHaqNewEntryPage {

  haqEntry: HAQEntry = { date: new Date().toISOString().substr(0, 10), answers: [] };
  answer: any;
  categoriSheet: HAQCategory[];
  pageSheet: HAQPage[];
  title: String;
  descriptionTextTools: String;
  descriptionTextHelp: String;
  page: number;
  texts: Array<any> = [{ text1: String, text2: String }];
  answersheet: Array<any> = [{ text: String, scr: String, value: Number, checked: Boolean }];
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private authService: AuthService, private haqService: HAQService,
    private alertCtrl: AlertController, private form: HaqAnswerForm) {
    this.getSheets();
    this.page = 1;
    this.descriptionTextTools = "Please seelct all the tools you have used for the above activities:";
   this.descriptionTextHelp = "Please select all activities where you have needed ordinary help from another person.";
    this.title = "New eHAQ";
    this.form.newList();
    this.answer = form.getMappingList();
  }

  ionViewCanEnter(): boolean {
    return this.authService.isLoggedIn();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EHaqNewEntryPage');
  }
  ionViewDidLeave() {
    this.form.newList();
    this.answer = this.form.getMappingList();
  }

  getSheets() {
    this.haqService.sheet().forEach(element => {
      this.pageSheet = element.pages;
      this.categoriSheet = element.pages[0].categories;
    });
    this.answersheet = [
      { text: "Without difficulties", scr: "../../assets/img/happy.png", value: 0, checked: false },
      { text: "With slight difficulties", scr: "../../assets/img/smiley-neutral.png", value: 1, checked: false },
      { text: "With great difficulties", scr: "../../assets/img/smiley-sad.png", value: 2, checked: false },
      { text: "I could not do that", scr: "../../assets/img/smiley-very-sad.png", value: 3, checked: false },
    ];
    this.texts = [{
      text1: "We would like to hear from you about how your illness affects your ability to manage in your daily life. ",
      text2: "Please select the answer that best describes what you could do IN THE LAST WEEK normally:"
    }];
  }

  saveAnswerRadio(el: HAQQuestion, value: number) {
    var found = false;
    this.haqEntry.answers.forEach(element => {
      if (el.questionId == element.questionId) {
        element.answer = value;
        found = true;
        return;
      }
    });
    if (!found) {
      this.haqEntry.answers.push({ questionId: el.questionId, answer: value });
    }
  }

  saveAnswerCheck(questionID: string) {
    var found = false;
    this.haqEntry.answers.forEach(element => {
      if (questionID == element.questionId) {
        if (element.answer == 0) element.answer = 1;
        if (element.answer == 1) element.answer = 0;
        found = true;
        return;
      }
    });
    if (!found) {
      this.haqEntry.answers.push({ questionId: questionID, answer: 1 });
    }
  }

  back() {
    document.getElementById("page1").style.display = 'block';
    document.getElementById("page2").style.display = 'none';
    this.page = 1;
    this.texts[0].text1 = "We would like to hear from you about how your illness affects your ability to manage in your daily life. ";
    this.categoriSheet = this.pageSheet[0].categories;
    this.content.scrollToTop();
  }

  next() {
    if (this.filledOutPageOneCorrectly()) {
      document.getElementById("page1").style.display = 'none';
      document.getElementById("page2").style.display = 'block';
      this.page = 2;
      this.texts[0].text1 = "";
      this.categoriSheet = this.pageSheet[1].categories;
      this.content.scrollToTop();
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Error',
        message: 'You need to fill out every question before you can move on to the next page..',
        buttons: [{ text: 'Ok', handler: () => { } }]
      });
      alert.present();
    }
  }

  finish() {
    if (this.filledOutPageTwoCorrectly) {
      let alert = this.alertCtrl.create({
        title: 'Submit form',
        message: 'Do you want to this HAQ-form?',
        buttons: [{ text: 'Cancel', role: 'cancel', handler: () => { } },
        {
          text: 'Submit',
          handler: () => {

            this.haqService.saveEntry(this.haqEntry).subscribe(
              res => {
                if (res) {
                  this.navCtrl.setRoot(EHAQPage)
                    .catch(() => this.navCtrl.setRoot(LogoutPage))
                }
              },
              err => console.log("Error saving entry")
            );;
          }
        }
        ]
      });
      alert.present();
    }
  }

  cancel() {
    this.navCtrl.setRoot(EHAQPage).catch(() => this.navCtrl.setRoot(LogoutPage))
  }

  private filledOutPageOneCorrectly(): boolean {
    return true;
  }
  private filledOutPageTwoCorrectly(): boolean {
    return true;
  }

}
