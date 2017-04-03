import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PainDiaryPage } from '../pain-diary/pain-diary';
import { GenerateReportPage } from '../generate-report/generate-report';
import { LoginPage } from '../login/login';

import { Chart } from 'chart.js';


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
  public lineChartData1: Array<any> = [ // medicine graph
      { data: [6, 5, 6, 8, 6, 5, 4, 6, 5, 6, 8, 6, 5, 4, 6, 5, 6], label: 'BSG' },
      { data: [5, 2, 7, 6, 6, 7, 5, 5, 2, 7, 6, 6, 7, 5, 5, 2, 7], label: 'CRP' } 
    ];
  public lineChartData2: Array<any> = [ // eHAQ and eDAS graph
      { data: [1.6, 1.2, 1.1, 1.3, 1.7, 1.8, 1.9, 2, 1.8, 1.7, 1.6, 1.9, 2, 2.1, 2.2, 2, 1.9], label: 'eHAQ' },
      { data: [5, 2, 7, 6, 6, 7, 5, 5, 2, 7, 6, 6, 7, 5, 5, 2, 7], label: 'eDAS' },  
    ];
    public lineChartData3: Array<any> = [ // Pain diary graph
      { data: [6, 5, 6, 8, 6, 5, 4, 6, 5, 6, 8, 9, 9, 8, 10, 10, 8], label: 'pain' },
      { data: [5, 4, 3, 6, 4, 4, 3, 4, 4, 5, 6, 8, 8, 8, 7, 7, 7], label: 'disease activity' },  
      { data: [0, 1, 2, 3, 2, 3, 1, 2, 2, 4, 2, 7, 6, 6, 6, 5, 4], label: 'fatigue'}  
    ];
    public lineChartData4: Array<any> = [ // BSG and CRP graph
      { data: [8, 7, 8, 9, 10, 9, 9, 10, 9, 8, 9, 9, 8, 9, 10, 10, 9], label: 'BSG' },
      { data: [1, 2, 3, 2, 3, 3, 3, 2.5, 2.2, 2.3, 2.0, 1.8, 3, 2.9, 2.5, 2.2, 2.7], label: 'CRP' },    
    ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.flag = "../../assets/img/flag-green.png";
    this.laboratoryDate = "22.04.2017 (Suggestion)";
    this.rheumatologistDate = "20.05.2017";
    this.graph = "3"; // shows segment 3 (graph 3)
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

  // ------ lineChart -----
 
  public lineChartLabels: Array<any> = ['21-feb', '', '', '', '28-feb', '', '', '', '07-mar', '', '', '', '14-mar', '', '', '', '21-mar'];
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
