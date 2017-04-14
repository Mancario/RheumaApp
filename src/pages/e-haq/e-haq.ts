import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EHaqNewEntryPage } from '../e-haq-new-entry/e-haq-new-entry';
import { AuthService } from "../../security/auth.service";
import { LogoutPage } from '../logout/logout';
import { Observable } from 'rxjs/Observable';
import { Http, Response, URLSearchParams, Headers } from '@angular/http';
import { API_URL } from "../../environments/environment";
import { HAQEntry, HAQService, HAQEntryList, HAQQuery } from "./e-haq-service"
/*
  Generated class for the EHAQ page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-e-haq',
  templateUrl: 'e-haq.html'
})
export class EHAQPage {
  private query: HAQQuery;
  eHAQdiaries: Observable<HAQEntryList>;

  diaries: Array<{ date: string, value: string, painvalue: number }>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private authService: AuthService, private _http: Http, private _haqService: HAQService) {
    this.getDiary();

    this.diaries = []; 
  }

  ionViewCanEnter(): boolean {
    return this.authService.isLoggedIn();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EHAQPage');
  }

  navNewEntry() {
    this.navCtrl.setRoot(EHaqNewEntryPage)
      .catch(() => this.navCtrl.setRoot(LogoutPage))
  }

  getDiary() {
    this.eHAQdiaries = this._haqService.listAllEntries();
    this.eHAQdiaries.forEach(element => {
      element.results.forEach(e => {
         this.diaries.push({ date: '' + e.date, value: ''+ e.score, painvalue: (e.score*10)});
      
    });
    });    
  }
}
