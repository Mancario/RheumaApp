
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { PainDiaryPage } from '../pain-diary/pain-diary';
import { GenerateReportPage } from '../generate-report/generate-report';
import { LoginPage } from '../login/login';
import { LogoutPage } from '../logout/logout';
import { Observable } from 'rxjs/Observable';
import { Http, Response, URLSearchParams, Headers } from '@angular/http';
import { AuthService } from "../../security/auth.service";
import { API_URL } from "../../environments/environment";
import { TranslateService } from '@ngx-translate/core';
import { DiaryService, DiaryEntry } from '../pain-diary/pain-diary-service'
import { HAQEntry } from "../e-haq/e-haq-service"
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
  graphList;
  dateLimit;
  graphLabels = { label1: String, label2: String, label3: String, label4: String };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private _http: Http,
    private _authService: AuthService,
    private translate: TranslateService,
    private _diaryService: DiaryService) {

      this.flag = "../../assets/img/flag-green.png";
      this.laboratoryDate = "22.04.2017 (Suggestion)";
      this.rheumatologistDate = "20.05.2017";
      this.graph = "1"; // shows segment 1 (graph 1)
      var temp = new Date();
      temp.setMonth(temp.getMonth() - 3);
      this.dateLimit = temp;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    // This should be done after a network test
    this.presentNoNetworkToast()
  }
  ionViewCanEnter(): any {
    var loggedIn = this._authService.isLoggedIn();
    if (!loggedIn) {
      this.navCtrl.setRoot(LogoutPage);
    } else {
      this.getGraphInfo();
      return loggedIn;
    }
  }

  presentNoNetworkToast() {

    this.translate.get("error.network").subscribe(networkMessage => {
        this.translate.get("button.close").subscribe(closeBtn => {
          let toast = this.toastCtrl.create({
            message: networkMessage,
            showCloseButton: true,
            closeButtonText: closeBtn,
            position: 'bottom'
          });

          toast.onDidDismiss(() => {
            console.log('Dismissed toast');
          });

          toast.present();
        })
    })
  }

  // buttons for side navigation
  painDiary() {
    this.navCtrl.setRoot(PainDiaryPage).catch(() => this._authService.logout());
  }
  generateReport() {
    this.navCtrl.setRoot(GenerateReportPage).catch(() => this._authService.logout());
  }

  // setGraphInfo(list: Array<string>) {
  //   var ehaq: Array<number> = [];
  //   var pain: Array<number> = [];
  //   var fatigue: Array<number> = [];
  //   var disease: Array<number> = [];

  //   // iterating through all dates and adding them to the right graph
  //   for (var i = 1; i < list.length; i++) {
  //     var element = list[i].split(',', 5); // seperating each line into a list of 5 elements

  //     // check valid date
  //     if ((new Date(element[0])) >= this.dateLimit) {

  //       // adding all eHAQ elements (the 5th element in the list)
  //       if (((element[4] && element[0]) != null) && ((element[4].localeCompare('') != 0))) {
  //         this.lineChartLabels2.push(element[0].substring(5));
  //         ehaq.push(parseFloat(element[4]));
  //       }

  //       // adding all pain diary elements if the list is not empty or do not contain pain diary data
  //         this.lineChartLabels1.push(element[0].substring(5));

  //         if (element[1].localeCompare('') == 0) // adding pain
  //           pain.push(null);
  //         else
  //           pain.push(parseFloat(element[1]));
  //         if (element[2].localeCompare('') == 0) // adding disease
  //           disease.push(null);
  //         else
  //           disease.push(parseFloat(element[2]));

  //         if (element[3].localeCompare('') == 0) // adding fatigue
  //           fatigue.push(null);
  //         else
  //           fatigue.push(parseFloat(element[3]));
  //       }
  //     }
  //   }
  //   // adding data values
  //   this.setGraphLabels().subscribe(
  //     value => {
  //       this.lineChartData1 =
  //         [{ data: pain, label: this.graphLabels.label1 },
  //         { data: disease, label: this.graphLabels.label2 },
  //         { data: fatigue, label: this.graphLabels.label3 }];
  //       this.lineChartData2 = [{ data: ehaq, label: this.graphLabels.label4 }];
  //       this.fixSpacesOnGraphs();
  //     }
  //   )

  // }
  setDiaryGraphInfo(list: DiaryEntry[]) {
    var pain: Array<number> = [];
    var fatigue: Array<number> = [];
    var disease: Array<number> = [];

    // adding all pain diary elements to graph
    list.forEach(diary => {
      if ((new Date(diary.date)) >= this.dateLimit) {
        if ((diary.pain || diary.diseaseActivity || diary.fatigue) != null) {

          var date = "" + new Date(diary.date).getDate() + "/" + (new Date(diary.date).getMonth() + 1);
          this.lineChartLabels1.push(date);
          if (diary.pain == null) // adding pain
            pain.push(null);
          else
            pain.push(diary.pain);

          if (diary.diseaseActivity == null) // adding disease
            disease.push(null);
          else
            disease.push(diary.diseaseActivity);

          if (diary.diseaseActivity == null) // adding fatigue
            fatigue.push(null);
          else
            fatigue.push(diary.fatigue);
        }
      }
    });

    // adding data values
    this.setDiaryGraphLabels().subscribe(
      value => {
        this.lineChartData1 =
          [{ data: pain, label: this.graphLabels.label1 },
          { data: disease, label: this.graphLabels.label2 },
          { data: fatigue, label: this.graphLabels.label3 }];
        this.fixSpacesOnGraphs();
      }
    )

  }

  setHAQGraphInfo(list: HAQEntry[]) {
  }

  setDiaryGraphLabels(): Observable<string | Object> {

    this.translate.get('pain.pain').subscribe(
      value => this.graphLabels.label1 = value
    );

    this.translate.get('pain.disease').subscribe(
      value => this.graphLabels.label2 = value
    );

    this.translate.get('pain.fatigue').subscribe(
      value => this.graphLabels.label3 = value
    );
    return this.translate.get('pain.fatigue');

  }
  setHAQGraphLabels(): Observable<string | Object> {

    this.translate.get('home.haq').subscribe(
      value => this.graphLabels.label4 = value
    );

    // This is for the method returning after the previous 4
    // async tasks are complete. I did not at the moment know
    // of a different approuch.
    return this.translate.get('home.haq');
  }

  fixSpacesOnGraphs() {
    // haq
    if (this.lineChartLabels2.length >= 30) {
      for (var i = 0; i < this.lineChartLabels2.length; i++) {
        if (i % 3 == 1 || i % 3 == 2)
          this.lineChartLabels2[i] = '';
      }
    }
    else if (this.lineChartLabels2.length >= 12) {
      for (var i = 0; i < this.lineChartLabels2.length; i++) {
        if (i % 2 == 1)
          this.lineChartLabels2[i] = '';
      }
    }
    // Pain
    if (this.lineChartLabels1.length >= 30) {
      for (var i = 0; i < this.lineChartLabels1.length; i++) {
        if (i % 3 == 1 || i % 3 == 2)
          this.lineChartLabels1[i] = '';
      }
    }
    else if (this.lineChartLabels1.length >= 12) {
      for (var i = 0; i < this.lineChartLabels1.length; i++) {
        if (i % 2 == 1)
          this.lineChartLabels1[i] = '';
      }
    }
  }

  // Graph info from database
  public getGraphInfo() {
    var object = this.getChart();
    object.forEach(value => {
      this.setDiaryGraphInfo(value);
    });
  }

  // get charts from database
  public getChart(): Observable<DiaryEntry[]> {
    return this._diaryService.listEntries({ offset: 0, count: 90 })
      .map(list => list.results)

  }
  /*
    public getChart(): Observable<string> {
      const headers: Headers = new Headers();
      headers.append('Authorization', 'Bearer ' + this._authService.loggedInUser().authToken);

      var params = new URLSearchParams();
      var object =
        this._http.get(API_URL + '/chart/csv', {
          headers,
          search: params,
        })
          .map(res => res.text())
          .catch(this.handleError);
      return object;
    }
    */

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



  // lineChar for Pain diary graph -  need setup data for the graphs to work
  public lineChartData1: Array<any> =
  [{ data: [0], label: 'pain' },
  { data: [0], label: 'disease activity' },
  { data: [0], label: 'fatigue' }];
  public lineChartLabels1: Array<any> = [];


  // lineChart for eHAQ graph
  public lineChartData2: Array<any> = [{ data: [0], label: 'eHAQ' }];
  public lineChartLabels2: Array<any> = [];

  // --------- lineChart settings for all graphs  ---------
  public lineChartOptions: any = {
    pointDot: false,
    responsive: true,
    innerHeight: 100,
    pointDotRadius: 3
  };
  public maxTextLines: number = 3;
  public lineChartColors: Array<any> = [
    { // blue
      backgroundColor: "rgba(151,187,205,0.2)",
      borderColor: "rgba(151,187,205,1)",
      pointBackgroundColor: "rgba(151,187,205,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(151,187,205,0.8)"
    },
    { // green
      backgroundColor: "rgba(70,191,189,0.2)",
      borderColor: "rgba(70,191,189,1)",
      pointBackgroundColor: "rgba(70,191,189,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(70,191,189,0.8)"
    },
    { // yellow
      backgroundColor: "rgba(253,180,92,0.2)",
      borderColor: "rgba(253,180,92,1)",
      pointBackgroundColor: "rgba(253,180,92,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(253,180,92,0.8)"
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177, 1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,1)'
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
    },
    { // red
      backgroundColor: "rgba(247,70,74,0.2)",
      borderColor: "rgba(247,70,74,1)",
      pointBackgroundColor: "rgba(247,70,74,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(247,70,74,0.8)"
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
