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
  graphs: string = "1";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.flag = "../../assets/img/flag-green.png"; 
    this.laboratoryDate = "22.04.2017 (Suggestion)"; 
    this.rheumatologistDate = "20.05.2017 (Suggestion)"; 
    this.graph = "../../assets/img/ionic-graph.jpg"; 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  // buttons for side navigation
  painDiary(){
    this.navCtrl.setRoot(PainDiaryPage);
  }

  generateReport(){
    this.navCtrl.setRoot(GenerateReportPage);
  }

  logout(){
    this.navCtrl.setRoot(LoginPage);
  }

  // graph buttons
  selectedgraph(){
   
  }

  // lineChart
  public lineChartData:Array<any> = [
    {data: [6, 5, 8, 8, 6, 5, 4], label: 'eDAS'},
    {data: [5, 5, 7, 6, 6, 7, 5], label: 'eHAQ'},
    {data: [0, 0, 0, 3, 1, 2, 2], label: 'pain diary'}
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March'];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
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
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
 
  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

}
