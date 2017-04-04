import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PainDiaryPage } from '../pain-diary/pain-diary';
import { GenerateReportPage } from '../generate-report/generate-report';
import { LoginPage } from '../login/login';
import {Observable}     from 'rxjs/Observable';
import { Chart } from 'chart.js';
import {Http, Response, URLSearchParams, Headers} from '@angular/http';
import {AuthService} from "../security/auth.service";
import {API_URL} from "../../environments/environment";
/*
  Generated class for the Home page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  flag;
  laboratoryDate;
  rheumatologistDate;
  graph;
  private _http: Http; 
  //private _authService: AuthService; 
  

  database: Array<{date: string, pain: number, disease_activity:number, fatigue:number, HAQ:number}>;
  
  // lineChart info for Pain diary graph
    public lineChartData1: Array<any> = [ 
      { data: [6, 5, 6, 8, 6, 5, 4, 6, 5, 6, 8, 9, 9, 8, 10, 10, 8], label: 'pain' },
      { data: [5, 4, 3, 6, 4, 4, 3, 4, 4, 5, 6, 8, 8, 8, 7, 7, 7], label: 'disease activity' },  
      { data: [0, 1, 2, 3, 2, 3, 1, 2, 2, 4, 2, 7, 6, 6, 6, 5, 4], label: 'fatigue'}  
    ];
    public lineChartLabels1: Array<any> = ['21-feb', '', '', '', '28-feb', '', '', '', '07-mar', '', '', '', '14-mar', '', '', '', '21-mar'];

  // lineChart info for eHAQ and eDAS graph
     public lineChartData2: Array<any> = [ 
      { data: [1.6, 1.2, 1.1, 1.3, 1.7, 1.8, 1.9, 2, 1.8, 1.7, 1.6, 1.9, 2, 2.1, 2.2, 2, 1.9], label: 'eHAQ' },
      { data: [1, null, null,1, null, null, null, null, null, 1, null, null, null, null, null,null, null], label: 'Test'}  
    ];
    public lineChartLabels2: Array<any> = ['21-feb', '', '', '', '28-feb', '', '', '', '07-mar', '', '', '', '14-mar', '', '', '', '21-mar'];


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.flag = "../../assets/img/flag-green.png";
    this.laboratoryDate = "22.04.2017 (Suggestion)";
    this.rheumatologistDate = "20.05.2017";
    this.graph = "1"; // shows segment 1 (graph 1)
    this.getGraphInfo();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  // buttons for side navigation
  painDiary() {
    this.navCtrl.setRoot(PainDiaryPage);
  }
  generateReport() {
    this.navCtrl.setRoot(GenerateReportPage);
  }
  logout() {
    this.navCtrl.setRoot(LoginPage);
  }

  // Graph info from database
  getGraphInfo(){
    

  }

    // get charts
    public getChart(): Observable<string> {
        const headers: Headers = new Headers();
      //  headers.append('Authorization', 'Bearer ' + this._authService.loggedInUser().authToken);

        var params = new URLSearchParams();

        return this._http
            .get(API_URL + '/chart/csv', {
                headers,
                search: params,
            })
            .map(res => res.text())
            .catch(this.handleError);
    }

 private handleError(error: Response) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        if (error.status === 404) return Observable.throw('Eintrag nicht gefunden.');
        if (error.status === 403)
            return Observable.throw('Sie sind derzeit nicht angemeldet oder Sie haben keine Berechtigung, diese Seite aufzurufen.');
        if (error.status === 401) return Observable.throw('Permission denied.');
        console.error(error);
        let errorMessage: string = null;
        if (error.json) {
            try {
                errorMessage = error.json().error;
            } catch (e) {
                errorMessage = 'Server error: ' + (error.statusText ? error.statusText : error);
            }
        }
        return Observable.throw(errorMessage);
    }

  // --------- lineChart settings for all graphs  ---------
  public lineChartOptions: any = {
    pointDot : false,
    responsive: true,
    innerHeight:100,
    pointDotRadius : 3
  };
  public maxTextLines: number = 3;
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }
  public chartHovered(e: any): void {
    console.log(e);
  }
}
