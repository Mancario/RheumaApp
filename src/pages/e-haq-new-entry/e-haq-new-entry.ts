import { Component, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthService } from "../../security/auth.service";
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular';
import { EHAQPage } from "../e-haq/e-haq"
import { LogoutPage } from '../logout/logout';
import { HAQEntry, HAQService, HAQPage, HAQCategory, HAQQuestion, HAQEntryAnswer } from "../e-haq/e-haq-service"
import { HaqAnswerForm } from "./e-haq-new-entry-form"
import { TranslateService } from '@ngx-translate/core';

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

  haqEntry: HAQEntry = { date: new Date().toISOString().substr(0, 10), answers: [], deleted: false, lastModified: 0 };
  answer: any;
  private date = {
    today: new Date().toISOString().substr(0, 10)
  }
  categoriSheet: HAQCategory[];
  pageSheet: HAQPage[];
  page: number;
  alternatives = { alt1: String, alt2: String, alt3: String, alt4: String }
  texts: Array<any> = [{ text1: String, text2: String }];
  answersheet: Array<any> = [{ text: String, scr: String, value: Number, checked: Boolean }];
  @ViewChild(Content) content: Content;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private authService: AuthService,
    private haqService: HAQService,
    private alertCtrl: AlertController,
    private form: HaqAnswerForm,
    private translate: TranslateService) {

      this.getSheets();
      this.page = 1;
      this.haqEntry.answers = form.getEditList();
      if (this.haqEntry.answers == null)
        this.haqEntry.answers = [];
      this.answer = form.getMappingList();

  }

  ionViewCanEnter(): boolean {
    return this.authService.isLoggedIn();
  }

  ionViewDidLoad() {
    if (this.form.isEdit()) {
      document.getElementById("dateButton").setAttribute("disabled", "true");
      this.haqEntry.date = this.form.getDate();
    }
    console.log('ionViewDidLoad EHaqNewEntryPage');
  }
  ionViewDidLeave() {
    this.form.newList();
    this.form.exit();
    this.answer = this.form.getMappingList();
  }

  getSheets() {
    this.haqService.sheet().forEach(element => {
      this.pageSheet = element.pages;
      this.categoriSheet = element.pages[0].categories;
    });

    this.setOptions().subscribe(
      value => {
        this.answersheet = [
          { text: this.alternatives.alt1, scr: "../../assets/img/happy.png", value: 0, checked: false },
          { text: this.alternatives.alt2, scr: "../../assets/img/smiley-neutral.png", value: 1, checked: false },
          { text: this.alternatives.alt3, scr: "../../assets/img/smiley-sad.png", value: 2, checked: false },
          { text: this.alternatives.alt4, scr: "../../assets/img/smiley-very-sad.png", value: 3, checked: false },
        ];
      }
    )

    this.translate.get('haq.introText1').subscribe(
      value => this.texts[0].text1 = value
    );

    this.translate.get('haq.introText2').subscribe(
      value => this.texts[0].text2 = value
    );

  }

  setOptions(): Observable<string | Object> {

    this.translate.get('haq.alt1').subscribe(
      value => this.alternatives.alt1 = value
    );

    this.translate.get('haq.alt2').subscribe(
      value => this.alternatives.alt2 = value
    );

    this.translate.get('haq.alt3').subscribe(
      value => this.alternatives.alt3 = value
    );

    this.translate.get('haq.alt4').subscribe(
      value => this.alternatives.alt4 = value
    );

    // This is for the method returning after the previous 4
    // async tasks are complete. I did not at the moment know
    // of a different approuch.
    return this.translate.get('haq.alt4');
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
    this.translate.get('haq.introText1').subscribe(
      value => this.texts[0].text1 = value
    );
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
      this.translate.get('haq.alertError').subscribe(
        errorTitle => {
          this.translate.get('haq.errorMessage').subscribe(
            errorMessage => {
              this.translate.get('button.ok').subscribe(
                okBtn => {
                  let alert = this.alertCtrl.create({
                    title: errorTitle,
                    message: errorMessage,
                    buttons: [{ text: okBtn, handler: () => { } }],
                  });
                  alert.present();
                }
              );
            }
          );
        }
      );
    }
  }

  finish() {
    if (this.filledOutPageTwoCorrectly()) {
      // NEW
      this.translate.get('haq.alertSubmit').subscribe(
        submitTitle => {
          this.translate.get('haq.submitMess').subscribe(
            submitMessage => {
              this.translate.get('button.cancel').subscribe(
                cancelBtn => {
                  this.translate.get('button.submit').subscribe(
                    submitBtn => {
                      let alert = this.alertCtrl.create({
                        title: submitTitle,
                        message: submitMessage,
                        buttons: [
                          {
                            text: cancelBtn,
                            role: 'cancel',
                            handler: () => {
                              console.log('Cancel clicked');
                            }
                          },
                          {
                            text: submitBtn,
                            handler: () => {

                              this.haqService.addEntry(this.haqEntry).subscribe(
                                res => {
                                  if (res) {
                                    this.navCtrl.setRoot(EHAQPage)
                                      .catch(() => this.navCtrl.setRoot(LogoutPage))
                                  }
                                },
                                err => this.displayErrorSavingToast()
                              );;
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
    else {
      this.translate.get('haq.alertError').subscribe(
        errorTitle => {
          this.translate.get('haq.errorMessage2').subscribe(
            errorMessage => {
              this.translate.get('button.ok').subscribe(
                okBtn => {
                  let alert = this.alertCtrl.create({
                    title: errorTitle,
                    message: errorMessage,
                    buttons: [{ text: okBtn, handler: () => { } }],
                  });
                  alert.present();
                }
              );
            }
          );
        }
      );
    }
  }

  cancel() {
    // NEW
    this.translate.get('haq.cancelSubmit').subscribe(
      submitTitle => {
        this.translate.get('haq.cancelMess').subscribe(
          submitMessage => {
            this.translate.get('button.no').subscribe(
              noBtn => {
                this.translate.get('button.yes').subscribe(
                  yesBtn => {
                    let alert = this.alertCtrl.create({
                      title: submitTitle,
                      message: submitMessage,
                      buttons: [
                        {
                          text: noBtn,
                          role: 'cancel',
                          handler: () => {
                            console.log('Cancel clicked');
                          }
                        },
                        {
                          text: yesBtn,
                          handler: () => {
                            this.navCtrl.setRoot(EHAQPage).catch(() => this.navCtrl.setRoot(LogoutPage))
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

  private filledOutPageOneCorrectly(): boolean {
    var index = 0;
    var filledOut = true;
    this.categoriSheet.forEach(category => {
      category.difficulties.forEach(qestion => {
        this.haqEntry.answers.forEach(answers => {
          if (answers.questionId == qestion.questionId) {
            index++;

          }
        });
      });
      if (index == 0) {
        filledOut = false;
      }
      index = 0;
    });
    return filledOut;
  }

  private filledOutPageTwoCorrectly(): boolean {
    var index = 0;
    var filledOut = true;
    this.categoriSheet.forEach(category => {
      category.difficulties.forEach(qestion => {
        this.haqEntry.answers.forEach(answers => {
          if (answers.questionId == qestion.questionId) {
            index++;

          }
        });
      });
      if (index == 0) {
        filledOut = false;
      }
      index = 0;
    });
    return filledOut;
  }

  displayErrorSavingToast(){
    this.translate.get("error.storage").subscribe(errorMessage => {
      let toast = this.toastCtrl.create({
        message: errorMessage,
        showCloseButton: true,
        duration: 3000,
        position: 'top'
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      toast.present();
    })
  }
}
