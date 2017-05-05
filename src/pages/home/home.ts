
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
import { HAQEntry, HAQService } from "../e-haq/e-haq-service"

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
    private haqService: HAQService,
    private _diaryService: DiaryService) {

    this.graph = "1"; // shows segment 1 (graph 1)
    var temp = new Date();
    temp.setMonth(temp.getMonth() - 3);
    this.dateLimit = temp;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  ionViewCanEnter(): any {
    var loggedIn = this._authService.isLoggedIn();
    if (!loggedIn) {
      this.navCtrl.setRoot(LogoutPage);
    } else {
      this.haqService.refreshAllEntries().subscribe(_ => {})
      this._diaryService.refreshAllEntries().subscribe(_ => {})
      this.getGraphInfo()
      return loggedIn;
    }
  }

  // buttons for side navigation
  painDiary() {
    this.navCtrl.setRoot(PainDiaryPage).catch(() => this._authService.logout());
  }

  generateReport() {
    this.navCtrl.setRoot(GenerateReportPage).catch(() => this._authService.logout());
  }

  setDiaryGraphInfo(list: DiaryEntry[]) {
    var pain: Array<number> = [];
    var fatigue: Array<number> = [];
    var disease: Array<number> = [];
    list = list.reverse();


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
        this.fixSpacesOnDiaryGraph();
      }
    )
  }

  setHAQGraphInfo(list: HAQEntry[]) {
    list = list.reverse();
    var ehaq: Array<number> = [];
    list.forEach(entry => {
      if ((new Date(entry.date)) >= this.dateLimit) {
        this.lineChartLabels2.push(entry.date.substring(5));
        var score = entry.score / 10
        ehaq.push(parseFloat(score.toFixed(2)));
      }
    })
    // adding data values
    this.setHAQGraphLabels().subscribe(
      value => {
        this.lineChartData2 = [{ data: ehaq, label: this.graphLabels.label4 }];
        this.fixSpacesOnHAQGraph();
      }
    )
    console.log("haq graph data: ", this.lineChartData2)
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
    return this.translate.get('home.haq');
  }

  fixSpacesOnHAQGraph() {
    console.log("fix spaces")
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
  }
  fixSpacesOnDiaryGraph() {

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
    var painDiary = this.getChartFromDiary();
    painDiary.forEach(value => {
      this.setDiaryGraphInfo(value);
    });
    var haq = this.getChartFromHAQ();
    haq.forEach(value => {
      this.setHAQGraphInfo(value);
    });
  }

  // get charts from database
  public getChartFromDiary(): Observable<DiaryEntry[]> {
    return this._diaryService.listEntries({ offset: 0, count: 90 })
      .map(list => list.results)
  }

  public getChartFromHAQ(): Observable<HAQEntry[]> {
    return this.haqService.listEntries({ offset: 0, count: 90 })
      .map(list => list.results)
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
