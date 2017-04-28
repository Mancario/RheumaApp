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
  deleted: false
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



});
