import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { NavParamsMock, AuthServiceMock/*, DiaryServiceMock */} from '../../mocks.ts';
import { AuthService } from "../../security/auth.service";
import { DiaryService } from '../pain-diary/pain-diary-service';
import { MyApp } from '../../app/app.component';
import { NewEntryPage } from './new-entry';
import { PainDiaryPage } from '../pain-diary/pain-diary';
import { TranslateModule } from '@ngx-translate/core';


let comp: NewEntryPage;
let fixture: ComponentFixture<NewEntryPage>;
let de: DebugElement;
let el: HTMLElement;

let testEntry = {
  date: '2017-01-01',
  pain: 1,
  diseaseActivity: 1,
  fatigue: 1,
  prednisoloneDose: 1,
  additionalDrugs: 'One',
  tenderJoints: 'Two',
  comments: 'Three',
  deleted: false,
  lastModified: 0
}

describe('Page: New Pain Entry Page', () => {

    beforeEach(async(() => {

        TestBed.configureTestingModule({

            declarations: [MyApp, NewEntryPage],

            providers: [
              NavController,
              {provide: NavParams, useClass: NavParamsMock},
              {provide: AuthService, useClass: AuthServiceMock},
              //{provice: DiaryService, useClass: DiaryServiceMock}
              DiaryService,
            ],

            imports: [
                IonicModule.forRoot(MyApp),
                TranslateModule.forRoot()
            ]

        }).compileComponents();

    }));

    beforeEach(() => {

        fixture = TestBed.createComponent(NewEntryPage);
        comp    = fixture.componentInstance;

    });

    afterEach(() => {
        fixture.destroy();
        comp = null;
        de = null;
        el = null;
    });



    it('is created', () => {
        expect(fixture).toBeTruthy();
        expect(comp).toBeTruthy();
        expect(comp).toBeDefined();
    });


    it('populates entry correctly', () => {
        comp.populateEntry(testEntry);
        let entry = comp.getEntry();

        expect(entry.date).toEqual(testEntry.date);
        expect(entry.pain).toEqual(testEntry.pain);
        expect(entry.diseaseActivity).toEqual(testEntry.diseaseActivity);
        expect(entry.fatigue).toEqual(testEntry.fatigue);
        expect(entry.prednisoloneDose).toEqual(testEntry.prednisoloneDose);
        expect(entry.additionalDrugs).toEqual(testEntry.additionalDrugs);
        expect(entry.tenderJoints).toEqual(testEntry.tenderJoints);
        expect(entry.comments).toEqual(testEntry.comments);
        expect(entry.deleted).toEqual(testEntry.deleted);

    });

    /*  The rest of the function use the DiaryService directly, hence it
        uses the database directly. We have not found a way to mock this
        to give a satisfiable result. Therefore the testcases that include
        these sections of code has been made as an e2e-test.

    */


});
