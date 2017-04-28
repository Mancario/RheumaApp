import { HomePage } from './home';
import { LoginPage } from '../login/login';
import { IonicModule } from 'ionic-angular';
import { MyApp } from '../../app/app.component'; // C:\Users\siljeg95\Cordova_projects\RheumaApp\src\app\app.component.ts
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { AuthService } from '../../security/auth.service';
import { } from 'jasmine';
import { NavController, NavParams } from 'ionic-angular';
import { DebugElement } from '@angular/core';
import { LocalStorageService } from '../../security/local-storage.service';
import { StoreCredentialsService } from '../../security/store-credentials.service';
import { NavParamsMock, AuthServiceMock } from '../../mocks.ts';
import { TranslateModule } from '@ngx-translate/core';

let comp: HomePage;
let fixture: ComponentFixture<HomePage>;
let navCtrl: NavController;
let de: DebugElement;
let componentLogin: LoginPage;
let componentHome: HomePage;

/*
    To run the tests for this class, you need to comment out the two canvas in home.html.
    The tests can not define anything inside a canvas, where the graphs are, and will therefore fail.
 */

describe('Page: Home/dashboard page', function () {

    // testdata
    var stringlist_long = 'Date,Schmerz,Krankheitsaktivität,Müdigkeit,HAQ,\n2017-04-02,,,,1.86\n2017-04-06,3,2,5,,\n2017-04-07,4,3,6,,\n2017-04-08,5,4,2,1.86,\n2017-04-09,5,4,2,,\n2017-04-10,3,2,2,,\n2017-04-11,4,0,3,,\n2017-04-12,5,1,3,2.00,\n2017-04-13,7,1,5,,\n2017-04-14,7,2,4,,\n2017-04-15,2,1,3,,\n2017-04-16,3,2,1,,\n2017-04-17,3,6,4,,\n2017-04-18,3,2,4,,\n2017-04-20,6,3,5,2.00,\n2017-04-21,3,5,2,2.25,\n2017-04-22,6,8,7,,\n2017-04-23,5,7,6,2.00,'.split('\n');
    var lineChartDataPain_long: Array<any> =
        [{ data: [3, 4, 5, 5, 3, 4, 5, 7, 7, 2, 3, 3, 3, 6, 3, 6, 5], label: 'pain' },
        { data: [2, 3, 4, 4, 2, 0, 1, 1, 2, 1, 2, 6, 2, 3, 5, 8, 7], label: 'disease activity' },
        { data: [5, 6, 2, 2, 2, 3, 3, 5, 4, 3, 1, 4, 4, 5, 2, 7, 6], label: 'fatigue' }];
    var lineChartDataHAQ_long: Array<any> =
        [{ "data": [1.86, 1.86, 2, 2, 2.25, 2], "label": "eHAQ" }];
    var lineChartLabelsPain_long: Array<any> = ['04-06', '', '04-08', '', '04-10', '', '04-12', '', '04-14', '', '04-16', '', '04-18', '', '04-21', '', '04-23'];
    var lineChartLabelsHAQ_long: Array<any> = ['04-02', '04-08', '04-12', '04-20', '04-21', '04-23'];

    var stringlist_short = 'Date,Schmerz,Krankheitsaktivität,Müdigkeit,HAQ,\n2017-04-02,,,,1.86\n2017-04-06,3,2,5,,\n2017-04-07,4,3,6,,\n2017-04-08,5,4,2,1.86,\n2017-04-09,5,4,2,,\n2017-04-10,3,2,2,,\n2017-04-11,4,0,3,,\n2017-04-12,5,1,3,2.00,\n2017-04-13,7,1,5,,'.split('\n');
    var lineChartDataPain_short: Array<any> =
        [{ data: [3, 4, 5, 5, 3, 4, 5, 7], label: 'pain' },
        { data: [2, 3, 4, 4, 2, 0, 1, 1], label: 'disease activity' },
        { data: [5, 6, 2, 2, 2, 3, 3, 5], label: 'fatigue' }];
    var lineChartDataHAQ_short: Array<any> =
        [{ "data": [1.86, 1.86, 2, 2, 2.25, 2], "label": "eHAQ" }];
    var lineChartLabelsPain_short: Array<any> = ['04-06', '04-07', '04-08', '04-09', '04-10', '04-11', '04-12', '04-13'];
    var lineChartLabelsHAQ_short: Array<any> = ['04-02', '04-08', '04-12'];


    var stringlist_mix = 'Date,Schmerz,Krankheitsaktivität,Müdigkeit,HAQ,\n2017-04-02,,,,1.86\n2017-04-06,,2,5,,\n2017-04-07,4,3,6,,\n2017-04-08,5,4,2,1.86,\n2017-04-09,5,4,,,\n2017-04-10,3,2,2,,\n2017-04-11,4,0,3,,\n2017-04-12,5,,3,2.00,\n2017-04-13,,1,5,,'.split('\n');
    var lineChartDataPain_mix: Array<any> =
        [{ data: [null, 4, 5, 5, 3, 4, 5, null], label: 'pain' },
        { data: [2, 3, 4, 4, 2, 0, null, 1], label: 'disease activity' },
        { data: [5, 6, 2, null, 2, 3, 3, 5], label: 'fatigue' }];

    var stringlist_outOfDate = 'Date,Schmerz,Krankheitsaktivität,Müdigkeit,HAQ,\n2017-01-24,,,,1.86\n2016-04-06,3,2,5,,\n2016-04-07,4,3,6,,\n2016-04-08,5,4,2,1.86,\n2016-04-09,5,4,2,,\n2016-04-10,3,2,2,,\n2016-04-11,4,0,3,,\n2016-04-12,5,1,3,2.00,\n2016-04-13,7,1,5,,'.split('\n');

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyApp, HomePage],
            providers: [
                NavController,
                { provide: NavParams, useClass: NavParamsMock },
                { provide: AuthService, useClass: AuthServiceMock },
            ],
            imports: [
                IonicModule.forRoot(MyApp),
                TranslateModule.forRoot()
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomePage);
        comp = fixture.componentInstance;
    });

    afterEach(() => {
        fixture.destroy();
        comp = null;
        de = null;
    });

    it('is created', () => {
        expect(fixture).toBeTruthy();
        expect(comp).toBeTruthy();
        expect(comp).toBeDefined();
    });

    it('is created with 3 elements in lineChartData1', function () {
        expect(comp.lineChartData1.length == 3).toBeTruthy();
    });
    it('is created with 1 elements in lineChartData2', function () {
        expect(comp.lineChartData2.length == 1).toBeTruthy();
    });

    it('values are defined correctly in the long list of pain diary data', function () {
        var date = new Date("2017-04-25");
        comp.dateLimit = date.setMonth(date.getMonth() - 3);
        comp.setGraphInfo(stringlist_long);

        // input data should match mockdata
        expect(comp.lineChartData1[0].data).toEqual(lineChartDataPain_long[0].data);
        expect(comp.lineChartData1[1].data).toEqual(lineChartDataPain_long[1].data);
        expect(comp.lineChartData1[2].data).toEqual(lineChartDataPain_long[2].data);

        expect(comp.lineChartData1[0].data.length == 17).toBeTruthy();
        expect(comp.lineChartData1[1].data.length == 17).toBeTruthy();
        expect(comp.lineChartData1[2].data.length == 17).toBeTruthy();


    });

    it('values are defined correctly in the short list of pain diary data', function () {
        var date = new Date("2017-04-25");
        comp.dateLimit = date.setMonth(date.getMonth() - 3);
        comp.setGraphInfo(stringlist_short);

        // input data should match mockdata
        expect(comp.lineChartData1[0].data).toEqual(lineChartDataPain_short[0].data);
        expect(comp.lineChartData1[1].data).toEqual(lineChartDataPain_short[1].data);
        expect(comp.lineChartData1[2].data).toEqual(lineChartDataPain_short[2].data);

        expect(comp.lineChartData1[0].data.length == 8).toBeTruthy();
        expect(comp.lineChartData1[1].data.length == 8).toBeTruthy();
        expect(comp.lineChartData1[2].data.length == 8).toBeTruthy();


    });

    it('values are defined correctly in the mixed list of pain diary data', function () {
        var date = new Date("2017-04-25");
        comp.dateLimit = date.setMonth(date.getMonth() - 3);
        comp.setGraphInfo(stringlist_mix);

        // input data should match mockdata
        expect(comp.lineChartData1[0].data).toEqual(lineChartDataPain_mix[0].data);
        expect(comp.lineChartData1[1].data).toEqual(lineChartDataPain_mix[1].data);
        expect(comp.lineChartData1[2].data).toEqual(lineChartDataPain_mix[2].data);

        expect(comp.lineChartData1[0].data.length == 8).toBeTruthy();
        expect(comp.lineChartData1[1].data.length == 8).toBeTruthy();
        expect(comp.lineChartData1[2].data.length == 8).toBeTruthy();

    });

    it('creates spaces in graph labels if the list contains >= 10 dates', function () {
        var date = new Date("2017-04-25");
        comp.dateLimit = date.setMonth(date.getMonth() - 3);
        comp.setGraphInfo(stringlist_long);
        expect(comp.lineChartLabels1.some(element => element == '')).toBeTruthy();

    });

    it('does not creates spaces in graph labels if the list contains < 10 dates', function () {
        var date = new Date("2017-04-25");
        comp.dateLimit = date.setMonth(date.getMonth() - 3);
        comp.setGraphInfo(stringlist_short);
        expect(comp.lineChartLabels1.some(element => element != '')).toBeTruthy();

    });
    it('labels in pain and haq should be defined correctly for long list', function () {
        var date = new Date("2017-04-25");
        comp.dateLimit = date.setMonth(date.getMonth() - 3);

        comp.setGraphInfo(stringlist_long);
        expect(comp.lineChartLabels1).toEqual(lineChartLabelsPain_long);
        expect(comp.lineChartLabels2).toEqual(lineChartLabelsHAQ_long);

        expect(comp.lineChartLabels1[0]).not.toEqual(comp.lineChartLabels2[0]);
        expect(comp.lineChartLabels1[2]).toEqual(comp.lineChartLabels2[1]);

    });
    it('labels in pain and haq should be defined correctly for short list', function () {
        var date = new Date("2017-04-25");
        comp.dateLimit = date.setMonth(date.getMonth() - 3);

        comp.setGraphInfo(stringlist_short);
        expect(comp.lineChartLabels1).toEqual(lineChartLabelsPain_short);
        expect(comp.lineChartLabels2).toEqual(lineChartLabelsHAQ_short);

    });
    it('graph data should be empty if no valid dates', function () {
        var date = new Date("2017-04-25");
        comp.dateLimit = date.setMonth(date.getMonth() - 3);
        comp.setGraphInfo(stringlist_outOfDate);
        // pain values
        expect(comp.lineChartData1[0].data.length == 0).toBeTruthy();
        expect(comp.lineChartData1[1].data.length == 0).toBeTruthy();
        expect(comp.lineChartData1[2].data.length == 0).toBeTruthy();
        // ehaq values
        expect(comp.lineChartData2[0].data.length == 0).toBeTruthy();
    });
});
