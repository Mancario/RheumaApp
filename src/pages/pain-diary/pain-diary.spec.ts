import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { NavParamsMock, AuthServiceMock} from '../../mocks.ts';
import { AuthService } from "../../security/auth.service";
import { DiaryService } from './pain-diary-service';
import { MyApp } from '../../app/app.component';
import { PainDiaryPage } from './pain-diary';
import { TranslateModule } from '@ngx-translate/core';


let comp: PainDiaryPage;
let fixture: ComponentFixture<PainDiaryPage>;
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
  deleted: false
}

describe('Page: Pain Diary Page', () => {

    beforeEach(async(() => {

        TestBed.configureTestingModule({

            declarations: [MyApp, PainDiaryPage],

            providers: [
              NavController,
              {provide: NavParams, useClass: NavParamsMock},
              {provide: AuthService, useClass: AuthServiceMock},
              DiaryService
            ],

            imports: [
                IonicModule.forRoot(MyApp),
                TranslateModule.forRoot()
            ]

        }).compileComponents();

    }));

    beforeEach(() => {

        fixture = TestBed.createComponent(PainDiaryPage);
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

    it('Retrieves entries correctly', () => {
      //let length = comp['diaries'].length;
      let diaries;
      let paindiaries = comp.diaryService.listEntries({ offset: 0, count: 10 });
      paindiaries.forEach(element => {
        diaries = element.results;
      });

      expect(diaries).toBeDefined();


    });

    it('deletes entry correctly', () => {

    });

});
