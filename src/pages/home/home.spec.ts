
import { HomePage } from './home';
import { LoginPage } from '../login/login';
import { DiaryEntry, DiaryService } from '../pain-diary/pain-diary-service'
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
    var list_extraLong: DiaryEntry[] = [];
    var lineChartDataPain_extraLong: Array<any> =
        [{ data: [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2], label: 'pain' },
        { data: [0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5], label: 'disease activity' },
        { data: [0, 1, 2, 3, 4, 5, 6, 0, 1, 2, 3, 4, 5, 6, 0, 1, 2, 3, 4, 5, 6, 0, 1, 2, 3, 4, 5, 6, 0, 1], label: 'fatigue' }];

    var list_long: DiaryEntry[] = [];
    var lineChartDataPain_long: Array<any> =
        [{ data: [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1], label: 'pain' },
        { data: [0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1], label: 'disease activity' },
        { data: [0, 1, 2, 3, 4, 5, 6, 0, 1, 2, 3, 4, 5, 6, 0, 1, 2, 3, 4, 5], label: 'fatigue' }];
    var lineChartDataHAQ_long: Array<any> =
        [{ "data": [1.86, 1.86, 2, 2, 2.25, 2], "label": "eHAQ" }];
    var lineChartLabelsPain_long: Array<any> = ['04-06', '', '04-08', '', '04-10', '', '04-12', '', '04-14', '', '04-16', '', '04-18', '', '04-21', '', '04-23'];
    var lineChartLabelsHAQ_long: Array<any> = ['04-02', '04-08', '04-12', '04-20', '04-21', '04-23'];

    var list_short: DiaryEntry[] = [];
    var lineChartDataPain_short: Array<any> =
        [{ data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], label: 'pain' },
        { data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], label: 'disease activity' },
        { data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], label: 'fatigue' }];
    var lineChartDataHAQ_short: Array<any> =
        [{ "data": [1.86, 1.86, 2, 2, 2.25, 2], "label": "eHAQ" }];
    var lineChartLabelsPain_short: Array<any> = ['05-01', '05-02', '05-03', '05-04', '05-05', '05-06','05-07', '05-08', '05-09' , '05-10'];
    var lineChartLabelsHAQ_short: Array<any> = ['05-01', '05-02', '05-03'];

    var list_mix: DiaryEntry[] = [];
    var lineChartDataPain_mix: Array<any> =
        [{ data: [null, 1, 2, 3, 4, 5, 6, 7, 8, null], label: 'pain' },
        { data: [0, 1, 2, 3, 4, 5, null, 7, 8, 9], label: 'disease activity' },
        { data: [0, 1, 2, 3, null, 5, 6, 7, 8, 9], label: 'fatigue' }];

    var list_outOfDate: DiaryEntry[] = [];
    var lineChartDataPain_outOfDate: Array<any> =
        [{ data: [0, 1, 2], label: 'pain' },
        { data: [0, 1, 2], label: 'disease activity' },
        { data: [0, 1, 2], label: 'fatigue' }];
    var lineChartDataHAQ_outOfDate: Array<any> =
        [{ "data": [1.86, 1.86, 2], "label": "eHAQ" }];
    var lineChartLabelsPain_outOfDate: Array<any> = ['05-01', '05-02', '05-03'];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyApp, HomePage],
            providers: [
                NavController,
                { provide: NavParams, useClass: NavParamsMock },
                { provide: AuthService, useClass: AuthServiceMock },
                DiaryService
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

        for (var i = 1; i <= 10; i++) {
            this.list_short.push({
                date: "2017-05-" + i,
                pain: i,
                diseaseActivity: i,
                fatigue: i,
                prednisoloneDose: i,
                additionalDrugs: "",
                tenderJoints: "",
                comments: "",
                deleted: false,
                lastModified: new Date().getTime()
            })
        }

        for (var i = 1; i <= 10; i++) {
            let entry = {
                date: "2017-05-" + i,
                pain: i,
                diseaseActivity: i,
                fatigue: i,
                prednisoloneDose: i,
                additionalDrugs: "",
                tenderJoints: "",
                comments: "",
                deleted: false,
                lastModified: new Date().getTime()
            }
            if (i == 1) entry.pain = null;
            if (i == 10) entry.pain = null;
            if (i == 7) entry.diseaseActivity = null;
            if (i == 5) entry.fatigue = null;

            this.list_mix.push(entry)
        }
        for (var i = 0; i < 20; i++) {
            let temp = "" + i;
            if (i < 10)
                temp = "0" + temp;
            this.list_long.push({
                date: "2017-05-" + temp,
                pain: (i % 3),
                diseaseActivity: (i % 6),
                fatigue: (i % 7),
                prednisoloneDose: i,
                additionalDrugs: "",
                tenderJoints: "",
                comments: "",
                deleted: false,
                lastModified: new Date().getTime()
            })
        }
        for (var i = 0; i < 30; i++) {
            let temp = "" + i;
            if (i < 10)
                temp = "0" + temp;
            this.list_extraLong.push({
                date: "2017-05-" + temp,
                pain: (i % 3),
                diseaseActivity: (i % 6),
                fatigue: (i % 7),
                prednisoloneDose: i,
                additionalDrugs: "",
                tenderJoints: "",
                comments: "",
                deleted: false,
                lastModified: new Date().getTime()
            })
        }
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
    /*

    it('is created with 3 elements in lineChartData1', function () {
        expect(comp.lineChartData1.length == 3).toBeTruthy();
    });
    it('is created with 1 elements in lineChartData2', function () {
        expect(comp.lineChartData2.length == 0).toBeTruthy();
    });

    it('values are defined correctly in the long list of pain diary data', function () {
        var date = new Date("2017-04-25");
        comp.dateLimit = date.setMonth(date.getMonth() - 3);
        comp.setDiaryGraphInfo(list_long);

        // input data should match mockdata
        expect(comp.lineChartData1[0].data).toEqual(lineChartDataPain_long[0].data);
        expect(comp.lineChartData1[1].data).toEqual(lineChartDataPain_long[1].data);
        expect(comp.lineChartData1[2].data).toEqual(lineChartDataPain_long[2].data);

        expect(comp.lineChartData1[0].data.length == 20).toBeTruthy();
        expect(comp.lineChartData1[1].data.length == 20).toBeTruthy();
        expect(comp.lineChartData1[2].data.length == 20).toBeTruthy();


    });

    it('values are defined correctly in the short list of pain diary data', function () {
        var date = new Date("2017-04-25");
        comp.dateLimit = date.setMonth(date.getMonth() - 3);
        comp.setDiaryGraphInfo(list_short);

        // input data should match mockdata
        expect(comp.lineChartData1[0].data).toEqual(lineChartDataPain_short[0].data);
        expect(comp.lineChartData1[1].data).toEqual(lineChartDataPain_short[1].data);
        expect(comp.lineChartData1[2].data).toEqual(lineChartDataPain_short[2].data);

        expect(comp.lineChartData1[0].data.length == 10).toBeTruthy();
        expect(comp.lineChartData1[1].data.length == 10).toBeTruthy();
        expect(comp.lineChartData1[2].data.length == 10).toBeTruthy();


    });

    it('values are defined correctly in the mixed list of pain diary data', function () {
        var date = new Date("2017-04-25");
        comp.dateLimit = date.setMonth(date.getMonth() - 3);
        comp.setDiaryGraphInfo(list_mix);

        // input data should match mockdata
        expect(comp.lineChartData1[0].data).toEqual(lineChartDataPain_mix[0].data);
        expect(comp.lineChartData1[1].data).toEqual(lineChartDataPain_mix[1].data);
        expect(comp.lineChartData1[2].data).toEqual(lineChartDataPain_mix[2].data);

        expect(comp.lineChartData1[0].data.length == 8).toBeTruthy();
        expect(comp.lineChartData1[1].data.length == 8).toBeTruthy();
        expect(comp.lineChartData1[2].data.length == 8).toBeTruthy();

    });

    it('creates spaces in graph labels if the list contains >= 12 dates', function () {
        var date = new Date("2017-04-25");
        comp.dateLimit = date.setMonth(date.getMonth() - 3);
        comp.setDiaryGraphInfo(list_long);
        expect(comp.lineChartLabels1.some(element => element == '')).toBeTruthy();

    });

    it('does not creates spaces in graph labels if the list contains < 12 dates', function () {
        var date = new Date("2017-04-25");
        comp.dateLimit = date.setMonth(date.getMonth() - 3);
        comp.setDiaryGraphInfo(list_short);
        expect(comp.lineChartLabels1.some(element => element != '')).toBeTruthy();

    });
    it('labels in pain and haq should be defined correctly for long list', function () {
        var date = new Date("2017-04-25");
        comp.dateLimit = date.setMonth(date.getMonth() - 3);

        comp.setDiaryGraphInfo(list_long);
        comp.setHAQGraphInfo(null);
        expect(comp.lineChartLabels1).toEqual(lineChartLabelsPain_long);
        expect(comp.lineChartLabels2).toEqual(lineChartLabelsHAQ_long);

        expect(comp.lineChartLabels1[0]).not.toEqual(comp.lineChartLabels2[0]);
        expect(comp.lineChartLabels1[2]).toEqual(comp.lineChartLabels2[1]);

    });
    it('labels in pain and haq should be defined correctly for short list', function () {
        var date = new Date("2017-04-25");
        comp.dateLimit = date.setMonth(date.getMonth() - 3);

        comp.setDiaryGraphInfo(list_short);
        comp.setHAQGraphInfo(null);

        expect(comp.lineChartLabels1).toEqual(lineChartLabelsPain_short);
        expect(comp.lineChartLabels2).toEqual(lineChartLabelsHAQ_short);

    });
    it('graph data should be empty if no valid dates', function () {
        var date = new Date("2017-04-25");
        comp.dateLimit = date.setMonth(date.getMonth() - 3);

        comp.setDiaryGraphInfo(list_outOfDate);
        // pain values
        expect(comp.lineChartData1[0].data.length == 0).toBeTruthy();
        expect(comp.lineChartData1[1].data.length == 0).toBeTruthy();
        expect(comp.lineChartData1[2].data.length == 0).toBeTruthy();
        // ehaq values
        expect(comp.lineChartData2[0].data.length == 0).toBeTruthy();
    }); */
});
